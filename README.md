<div align="center">

# Anna Sethu - Surplus Food Redistribution

> *Bridging the gap between food surplus and communities in need.*

[Live Demo](https://anna-sethu-8z3m.onrender.com/) · [Report Bug](https://github.com/bhnandan313-pixel/foodbridge_zero_waste/issues) · [Request Feature](https://github.com/bhnandan313-pixel/foodbridge_zero_waste/issues)

</div>

---

## About the Project

Anna Sethu is a web platform designed to tackle food waste and hunger by connecting food donors with verified NGOs, shelters, volunteers, and communities in need.

The platform supports donation registration, food-safety details, smart NGO matching, rescue pickup workflows, delivery confirmation, impact reporting, and a live Rescue Radar.

---

## Key Features

- Surplus food donation registration with quantities and pickup details.
- Food category, preparation, storage, packaging, allergen, and safe-distribution deadlines.
- Smart matching with nearby verified NGO demo entities.
- Donation claiming, pickup tracking, and delivery confirmation.
- Impact metrics based on completed food rescues.
- Rescue Radar with available donations and active rescue statistics.
- Authentication for donors, NGOs, and volunteers.
- Responsive dark UI with animated mobile layouts.

---

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion.
- Backend: Node.js and Express.
- Database and storage: Firebase Firestore.
- Authentication API: Express, JWT, and bcryptjs.
- Hosting: Render.
- Icons: Lucide React.

---

## Getting Started

### Prerequisites

- Git
- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/bhnandan313-pixel/foodbridge_zero_waste.git
cd foodbridge_zero_waste
npm install
```

### Run Frontend and Backend

Start both development services:

```bash
npm run dev:full
```

The default services are:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

To run them separately:

```bash
npm run dev
npm run server
```

### Production Build

```bash
npm run build
npm start
```

The Express server serves the production React build and API together at `http://localhost:3001`.

---

## Backend Environment Variables

For local development, `server.js` uses a development JWT fallback. Production deployments must configure:

```text
NODE_ENV=production
JWT_SECRET=your-long-random-secret
```

Generate a secure secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

On Render, add both variables in **Service > Environment**.

---

## Deployment

The production build command is:

```bash
npm ci && npm run build
```

The production start command is:

```bash
npm start
```

The API health endpoint is:

```text
/api/health
```

Render should be configured with this health-check path.

---

## Live Demo

Try the deployed application:

https://anna-sethu-8z3m.onrender.com/

---

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add amazing feature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/amazing-feature
   ```

5. Open a pull request.

---

<div align="center">
  Made with care for a zero-waste future.
</div>
