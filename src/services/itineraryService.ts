import type { Activity, Trip } from "../models.js";

//Calculate cost
export const calculateTotalCost = (trip: Trip): number => 
 trip.activities.reduce((sum, activity)=> sum + activity.cost, 0)

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
    const id = Date.now().toString(); //Konverterar  tid i millesekunder till en sträng
    return {
        id,
        destination,
        startDate,
        activities: []
      };
    };


//Filter catergory
export const filterByCategory = (trip: Trip, category: string): Activity[] => {
  return trip.activities.filter((activity) => {
     return activity.category === category;
  });
};



//Sort activities
export const sortActivitiesByTime = (trip: Trip): Activity[] => {
  const sortedActivities = [...trip.activities];
  
  sortedActivities.sort((activity1, activity2) => 
    activity1.startTime.getTime() - activity2.startTime.getTime());

  return sortedActivities;
};


//filter activity by a specific day
export const getActivitiesByDay = (trip: Trip, date: Date): Activity[] => {
  return trip.activities.filter((activity) => 
          activity.startTime.getFullYear() === date.getFullYear() &&
          activity.startTime.getMonth() === date.getMonth() &&
          activity.startTime.getDate() === date.getDate()
)};