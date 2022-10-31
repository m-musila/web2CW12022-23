// Implement the store
const nedb = require("nedb");
// const Datastore = require("nedb-promises");

// returns implicit Promise as a result using async
// var async = require("async");
// const { schedule } = require("../controllers/controller");

const db = new nedb({ filename: "database/goals", autoload: true });
// let datastore = Datastore.create("database/goals");
// async function schedules1() {
//   await datastore
//     .find({}, (err, schedule))
//     .then(console.log("i am ", schedule))
//     .catch(console.log("this", err));
// }
// schedules1;
// async function schedules() {
//   await db.find({}, (err, schedule) => {
//     if (err) {
//       return err;
//     } else {
//       console.log(schedule);
//     }
//   });
// }
//   db.find({}, (err, schedules) => {
//     if (err) {
//         console.log("Promise err", err);
//     } else {
//         console.log("Promise success", schedules);
//     }
//   });

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
      remove: "Delete-Goal",
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
  // Get by category
  getScheduleByCategory(category) {
    return new Promise((resolve, reject) => {
      this.db.find({ category: category }, (err, schedule) => {
        if (err) {
          reject(err);
        } else {
          resolve(schedule);
          console.log("getEntriesByUser returns: ", schedule);
        }
      });
    });
  }
  remove(date) {
    new Promise((resolve, reject) => {
      this.db.remove({ date: date }, {}, (err, numRemoved) => {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
          console.log("getEntriesByUser returns: ", numRemoved);
          return {};
        }
      });
    });
  }
}

// Make the module visible outside.
module.exports = Wellness;
// module.exports = {
//   schedules: schedules,
// };
