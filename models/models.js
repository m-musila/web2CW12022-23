// Implement the store
const nedb = require("nedb");
const { schedule } = require("../controllers/controller");

// Data model class to implement functionality for data
class Wellness {
  // Instantiate the constructor
  // If the database path is not provided it defaults to in memory database else embedded
  constructor(dbPath) {
    if (dbPath) {
      // use embedded
      this.db = new nedb({ filename: dbPath, autoload: true });
    } else {
      // use in-memory
      this.db = new nedb();
    }
  }

  // Add a goal
  addGoal(date, category, goal) {
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
      time: d.getTime(),
      day: weekday[d.getDay()],
      date: date,
      category: category,
      goal: goal,
    };

    console.log("Goal created");

    this.db.insert(goals, (err, doc) => {
      if (err) {
        console.log("Error inserting document", err);
      } else {
        console.log("Goal added", doc);
      }
    });
  }

  // Get all entries
  getSchedule() {
    return new Promise((resolved, rejected) => {
      this.db.find({}, (err, schedule) => {
        if (err) {
          rejected(err);
        } else {
          resolved(schedule);
          console.log("Schedule: ", schedule);
        }
      });
    });
  }
}

// Make the module visible outside.
module.exports = Wellness;
