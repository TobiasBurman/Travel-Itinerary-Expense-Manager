import type { Trip, Activity } from "../models.ts";

/**
 * Calculate total cost of all activities in a trip
 */
export const calculateTotalCost = (trip: Trip): number => {
  return trip.activities.reduce(
    (sum: number, activity: Activity) => sum + activity.cost,
    0
  );
};

/**
 * Get activities that are above a certain cost
 */
export const getHighCostActivities = (
  trip: Trip,
  threshold: number
): Activity[] => {
  return trip.activities.filter(
    (activity: Activity) => activity.cost > threshold
  );
};

/**
 * Calculate total cost grouped by category
 */
export const getCostByCategory = (
  trip: Trip
): Record<string, number> => {
  return trip.activities.reduce(
    (result: Record<string, number>, activity: Activity) => {
      if (!result[activity.category]) {
        result[activity.category] = 0;
      }

      result[activity.category] += activity.cost;
      return result;
    },
    {}
  );
};