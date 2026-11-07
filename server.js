import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const app = express();
const port = Number(process.env.PORT || 3001);
const jwtSecret = process.env.JWT_SECRET || 'foodbridge-local-development-secret';
const dataDirectory = path.resolve(process.cwd(), 'data');
const usersFile = path.join(dataDirectory, 'users.json');

await fs.mkdir(dataDirectory, { recursive: true });

async function readUsers() {
  try {
    return JSON.parse(await fs.readFile(usersFile, 'utf8'));
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  const temporaryFile = `${usersFile}.tmp`;
  await fs.writeFile(temporaryFile, JSON.stringify(users, null, 2), 'utf8');
  await fs.rename(temporaryFile, usersFile);
}

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function signUser(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '7d' });
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

function requireAuth(req, res, next) {
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Please sign in first.' });
  try {
    req.auth = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: 'Your session has expired. Please sign in again.' });
  }
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/auth/register', async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || '');
  const role = String(req.body.role || 'donor');

  if (name.length < 2) return res.status(400).json({ error: 'Please enter your name.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  if (!['donor', 'ngo', 'volunteer'].includes(role)) return res.status(400).json({ error: 'Invalid account type.' });

  const users = await readUsers();
  if (users.some((user) => user.email === email)) {
    return res.status(409).json({ error: 'An account already exists for this email.' });
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeUsers(users);
  res.status(201).json({ token: signUser(user), user: publicUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || '');
  const role = String(req.body.role || '');
  const user = (await readUsers()).find((entry) => entry.email === email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }
  if (role && user.role !== role) {
    return res.status(403).json({ error: `This account is registered as ${user.role}.` });
  }
  res.json({ token: signUser(user), user: publicUser(user) });
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  const user = (await readUsers()).find((entry) => entry.id === req.auth.sub);
  if (!user) return res.status(401).json({ error: 'Account not found.' });
  res.json({ user: publicUser(user) });
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const users = await readUsers();
  const user = users.find((entry) => entry.email === email);
  if (user) {
    const token = crypto.randomBytes(24).toString('hex');
    user.resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    user.resetTokenExpires = Date.now() + 30 * 60 * 1000;
    await writeUsers(users);
    console.log(`Password reset token for ${email}: ${token}`);
  }
  res.json({ message: 'If an account exists, password reset instructions have been sent.' });
});

app.post('/api/auth/reset-password', async (req, res) => {
  const tokenHash = crypto.createHash('sha256').update(String(req.body.token || '')).digest('hex');
  const password = String(req.body.password || '');
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });

  const users = await readUsers();
  const user = users.find((entry) => entry.resetTokenHash === tokenHash && entry.resetTokenExpires > Date.now());
  if (!user) return res.status(400).json({ error: 'Reset link is invalid or expired.' });
  user.passwordHash = await bcrypt.hash(password, 12);
  delete user.resetTokenHash;
  delete user.resetTokenExpires;
  await writeUsers(users);
  res.json({ message: 'Password updated successfully. You can now sign in.' });
});

app.listen(port, () => console.log(`Anna Sethu API running at http://localhost:${port}`));
