import type { Activity, Trip } from "../models.js";

//Calculate total cost
export const calculateTotalCost = (trip: Trip): number => {
    return trip.activities.reduce((sum, activity)=> sum + activity.cost, 0)
};

//add activity
export const addActivity = (trip: Trip, activity: Activity): Trip => {
    const newActivities = [...trip.activities, activity]; 
  
  return {
    ...trip,
    activities: newActivities
  };
};

//Create a trip
export const createTrip = (destination: string, startDate: Date): Trip => {
    const id = Date.now().toString(); //Konverterar nuvarande tid i millesekunder till en sträng
    return {
        id,
        destination,
        startDate,
        activities: []
      };
    };