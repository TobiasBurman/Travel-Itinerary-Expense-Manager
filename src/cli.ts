import inquirer from "inquirer";
import type { Trip, Activity } from "./models.ts";
import {
  createTrip,
  addActivity,
  calculateTotalCost,
  filterByCategory,
} from "./services/itineraryService.ts";
import { getDestinationInfo } from "./services/destinationServices.ts";

let currentTrip: Trip | null = null;

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
  //destination detailss
  try {
    const info = await getDestinationInfo(answers.destination);
    console.log("Trip to " + currentTrip.destination + " created :))");
    console.log("Currency: " + info.currency);
    console.log("Flag: " + info.flag);
  } catch (error) {
    console.log("Trip to " + currentTrip.destination + " created :))");
  }
};

const handleAddActivity = async () => {
  if (!currentTrip) {
    console.log("No trip yet. Create one first.");
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "activityName",
      message: "Activity name:",
    },
    {
      type: "number",
      name: "cost",
      message: "Cost (SEK):",
    },
    {
      type: "input",
      name: "startDate",
      message: "Date (YYYY-MM-DD HH:mm):",
    },
    {
      type: "list",
      name: "category",
      message: "Category:",
      choices: ["sightseeing", "food", "transport"],
    },
  ]);

  const activity: Activity = {
    id: Date.now().toString(),
    name: answers.activityName,
    cost: answers.cost,
    category: answers.category,
    startTime: new Date(answers.startDate),
  };

  currentTrip = addActivity(currentTrip, activity);
  console.log("Added " + activity.name);
};

const handleViewTrip = () => {
  if (!currentTrip) {
    console.log("No trip created.");
    return;
  }

  console.log("\n--- Trip Details ---");
  console.log("Destination: " + currentTrip.destination);
  console.log("Start: " + currentTrip.startDate.toLocaleDateString());
  console.log("Total cost: " + calculateTotalCost(currentTrip) + " SEK");

  console.log("\n--- Activities ---");
  if (currentTrip.activities.length === 0) {
    console.log("No activities.");
  } else {
    currentTrip.activities.forEach((activity, index) => {
      console.log(index + 1 + ". " + "Activity: " + activity.name);
      console.log("   Cost: " + activity.cost + " SEK");
      console.log("   Category: " + activity.category);
    });
  }
  console.log("");
};

const handleviewByCategory = async () => {
  if (!currentTrip) {
    console.log("No trip created.");
    return;
  } else {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "category",
        message: "Select category to filter:",
        choices: ["sightseeing", "food", "transport"],
      },
    ]);
    const getcategoryData = await filterByCategory(
      currentTrip,
      answer.category,
    );
    console.log("\n--- Activities in category: " + answer.category + " ---");
    if (getcategoryData.length === 0) {
      console.log("No activities in this category.");
    } else {
      getcategoryData.forEach((activity, index) => {
        console.log(index + 1 + ". " + "Activity: " + activity.name);
        console.log("   Cost: " + activity.cost + " SEK");
        console.log("   Start Time: " + activity.startTime.toLocaleString());
      });
    }
  }
};

const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        "Create Trip",
        "Add Activity",
        "View Trip",
        "View by Category",
        "View Budget",
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
  } else if (answers.action === "View by Category") {
    await handleviewByCategory();
  } else if (answers.action === "View Budget") {
    console.log("error"); //Khadija function
  } else if (answers.action === "Exit") {
    console.log("Goodbye!");
    return;
  }

  await mainMenu();
};

console.log("Travel Planner");
mainMenu();
