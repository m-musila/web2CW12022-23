// Implement the store
const nedb = require("nedb");
const { resolve } = require("path");

// Data model class to implement functionality for data processing.
class Wellness {
  // Instantiate the constructor
  // If the database path is not provided it defaults to in-memory database else embedded
  constructor(dbPath) {
    // Ternary operator
    dbPath
      ? (this.db = new nedb({ filename: dbPath, autoload: true }))
      : (this.db = new nedb());
  }
  // Arrow function are used to reduces code, make the code more readable and to auto bind 'this.' to surrounding code context.
  // Add a goal
  addGoal = (date, category, goal) => {
    // An array for looking up days of the week
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(date);
    let goals = {
      // time calculation for sorting goals in order of day of the week.
      time: d.getTime(),
      // d.getDay returns a number btw 0 and 6 that correspond to the days of the week
      day: weekday[d.getDay()],
      date: date,
      category: category,
      goal: goal,
    };
    console.log("Goal created");
    this.db.insert(goals, (err, doc) => {
      if (err) {
        console.log(`Error inserting document: ${err}`);
      } else {
        console.log(`Goal was added successfully: ${doc}`);
      }
    });
  };

  // Get the schedule.
  getSchedule = () => {
    // A Promise is an object returns the success or failure of an asynchronous operation.
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, schedule) => {
        if (err) {
          reject(err);
        } else {
          resolve(schedule);
          console.log(`Returned the all schedule: ${schedule}`);
        }
      });
    });
  };

  // Get by category
  getScheduleByCategory = (category) => {
    return new Promise((resolve, reject) => {
      this.db.find({ category: category }, (err, schedule) => {
        if (err) {
          reject(err);
        } else {
          resolve(schedule);
          console.log(`Get schedule by category:${schedule}`);
        }
      });
    });
  };

  // Update a goal
  updateGoal = (date, category, goal) => {
    return new Promise((resolve, reject) => {
      this.db.update(
        { date: date, category: category },
        { $set: { goal: goal } },
        //Include so that all documents that match the query criteria are updated.
        { multi: true },
        (err, numReplaced) => {
          if (err) {
            reject(err);
          } else {
            resolve(numReplaced);
            console.log(
              `Get schedule by category, number replaced:${numReplaced}`
            );
          }
        }
      );
    });
  };

  // Remove a goal
  removeGoal = (date, category) => {
    return new Promise((resolve, reject) => {
      this.db.remove(
        { date: date, category: category },
        {},
        (err, numRemoved) => {
          if (err) {
            reject(err);
          } else {
            resolve(numRemoved);
            console.log(`Number deleted :${numRemoved}`);
          }
        }
      );
    });
  };
}

// Make the module visible outside.
module.exports = Wellness;
