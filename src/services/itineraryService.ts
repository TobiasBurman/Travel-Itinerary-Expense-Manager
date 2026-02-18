import type { Activity, Trip } from './../models';

export const calculateTotalCost = (trip: Trip): number => {
    return trip.activities.reduce((sum, activity)=> sum + activity.cost, 0)
};
