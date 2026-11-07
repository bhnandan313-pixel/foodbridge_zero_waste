import { ngos } from './demoData';

const normalizeFoodType = (foodType = '') => foodType.toLowerCase().trim();
const typeAliases = {
  'cooked meals': ['cooked meals', 'rice', 'curry', 'meal', 'vegetarian'],
  groceries: ['groceries', 'packaged food', 'packaged'],
  fruits: ['fruits', 'fruit', 'produce'],
  vegetables: ['vegetables', 'vegetable', 'produce'],
  bakery: ['bakery', 'bread', 'bakery goods', 'baked goods'],
  'packaged food': ['packaged food', 'groceries'],
};

export function findNearestNGO(donationType, quantity = 0) {
  const normalizedType = normalizeFoodType(donationType);
  const mealQuantity = Number(quantity) || 0;
  const acceptedTypes = Object.entries(typeAliases).flatMap(([category, aliases]) => (
    aliases.some((alias) => normalizedType.includes(alias)) ? [category, ...aliases] : []
  ));

  const eligibleNgo = [...ngos]
    .filter((ngo) => {
      const typeMatches = ngo.supportedTypes.some((type) => (
        normalizedType.includes(type) || type.includes(normalizedType)
        || acceptedTypes.includes(type)
      ));
      return typeMatches && ngo.capacityMeals >= mealQuantity;
    })
    .sort((a, b) => a.distanceKm - b.distanceKm)[0];

  if (!eligibleNgo) {
    throw new Error('No nearby NGO can safely accept this food quantity and category.');
  }

  const match = eligibleNgo;
  const proximityScore = Math.max(82, 99 - Math.round(match.distanceKm * 1.2));
  const capacityScore = match.capacityMeals >= mealQuantity ? 1 : 0;

  return {
    ...match,
    matchConfidence: Math.min(99, proximityScore + capacityScore),
  };
}
