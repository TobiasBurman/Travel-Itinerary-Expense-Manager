import inquirer from "inquirer";
import type { Trip, Activity } from "./models.ts";
import {
  createTrip,
  addActivity,
  calculateTotalCost,
} from "./services/itineraryService.ts";
import { getDestinationInfo } from "./services/destinationServices.ts";
import fs from "fs";

let currentTrip: Trip | null = null;

//Create Trip FUNC
const handleCreateTrip = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "destination",
      message: "Where do you want to go?",
    },
    {
      type: "input",
      name: "startDate",
      message: "Start date (YYYY-MM-DD):",
    },
  ]);
  const date = new Date(answers.startDate);
  currentTrip = createTrip(answers.destination, date);
  console.log(`Trip to ${currentTrip.destination} created!\n`);
};

//create activity
const handleAddActivity = async () => {
  if (!currentTrip) {
    console.log("Please create a trip first.");
    return;
  } else {
    const answersAddActivity = await inquirer.prompt([
      {
        type: "input",
        name: "activityName",
        message: "What activity would you like to add?",
      },
      {
        type: "input",
        name: "cost",
        message: "What is the cost of this activity?",
      },
      {
        type: "input",
        name: "startDate",
        message: "Activity start date (YYYY-MM-DD):",
      },
      {
        type: "checkbox",
        name: "category",
        message: "Select category:",
        choices: ["sightseeing", "food", "transport"],
      },
    ]);
    const activity: Activity = {
      name: answersAddActivity.activityName,
      cost: parseFloat(answersAddActivity.cost),
      category: answersAddActivity.category,
      startTime: new Date(answersAddActivity.startDate),
      id: Date.now().toString(),
    };
    addActivity(currentTrip, activity);
  }
};

const handleViewTrip = async () => {
  if (!currentTrip) {
    console.log("No trip created yet.");
    return;
  }
  const data = await JSON.parse(fs.readFileSync("../db.json", "utf-8"));
  //get data from
  const trip = data.trips.find((trip: Trip) => trip.id === currentTrip?.id);
  console.log("\n--- Trip Details ---");
  console.log(`Destination: ${trip.destination}`);
  console.log(`Start Date: ${trip.startDate}`);
  console.log("--- Activities ---");
  trip.activities.forEach((activity: Activity) => {
    console.log(
      `Activity: ${activity.name}, Cost: ${activity.cost}, Category: ${activity.category.join(", ")}`,
    );
  });
};

const mainMenu = async () => {
  console.log("\nWelcome to the Travel Itinerary Planner!");

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "Create Trip",
        "Add Activity",
        "View Trip",
        "View Budget",
        "Delete All Trips",
        "Exit",
      ],
    },
  ]);

  if (answers.action === "Create Trip") {
    await handleCreateTrip();
  } else if (answers.action === "Add Activity") {
    await handleAddActivity();
  } else if (answers.action === "View Trip") {
    await handleViewTrip();
  } else if (answers.action === "Delete All Trips") {
    const data = JSON.parse(fs.readFileSync("../db.json", "utf-8"));
    data.trips = [];
    fs.writeFileSync("../db.json", JSON.stringify(data, null, 2));
    console.log("All trips deleted.");
  }
  //   else if (answers.action === 'View Budget') {

  //   }
  else if (answers.action === "Exit") {
    console.log("Goodbye");
    return;
  }

  await mainMenu();
};

mainMenu();
