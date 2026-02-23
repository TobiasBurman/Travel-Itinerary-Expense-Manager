import inquirer from 'inquirer';
import type { Trip, Activity } from './models.js';
import { createTrip, addActivity, calculateTotalCost } from './services/itineraryService.js';
import { getDestinationInfo } from './services/destinationServices.js';

let currentTrip: Trip | null = null; 

//Create Trip FUNC
const handleCreateTrip = async () => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "destination",
        message: "Where do you want to go?"
      },
      {
        type: "input",
        name: "startDate",
        message: "Start date (YYYY-MM-DD):"
      }
      
    ]);
    const date = new Date(answers.startDate);
    currentTrip = createTrip(answers.destination, date);
    console.log(`Trip to ${currentTrip.destination} created!\n`);
}

const mainMenu = async () => {
    
    const answers = await inquirer.prompt([{ 
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["Create Trip", "Add Activity", "View Trip", "View Budget", "Exit"]
    }]);
  
    if (answers.action === "Create Trip") {
      await handleCreateTrip();
    }
    else if (answers.action === 'Add Activity') {
        // await handleAddActivity();
      }
      else if (answers.action === 'View Trip') {
        // handleViewTrip();
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