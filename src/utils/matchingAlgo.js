import { ngos } from './demoData';

const normalizeFoodType = (foodType = '') => foodType.toLowerCase().trim();

export function findNearestNGO(donationType, quantity = 0) {
  const normalizedType = normalizeFoodType(donationType);
  const mealQuantity = Number(quantity) || 0;

  const eligibleNgo = [...ngos]
    .filter((ngo) => {
      const typeMatches = ngo.supportedTypes.some((type) => (
        normalizedType.includes(type) || type.includes(normalizedType)
      ));
      return typeMatches && ngo.capacityMeals >= mealQuantity;
    })
    .sort((a, b) => a.distanceKm - b.distanceKm)[0];

  const match = eligibleNgo || [...ngos].sort((a, b) => a.distanceKm - b.distanceKm)[0];
  const proximityScore = Math.max(82, 99 - Math.round(match.distanceKm * 1.2));
  const capacityScore = match.capacityMeals >= mealQuantity ? 1 : 0;

  return {
    ...match,
    matchConfidence: Math.min(99, proximityScore + capacityScore),
  };
}
