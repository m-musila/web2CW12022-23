const { response, request } = require("express");
const goalDAO = require("../models/models.js");

// Create an instance of goals
// const db = new goalDAO();
// During development its best to used in-memory db
// const promise = require("../models/models");
const db = new goalDAO("database/goals.db");

exports.sign_in = (req, res) => {
  res.render("signIn", {
    title: "Sign In",
  });
};

exports.sign_up = (req, res) => {
  res.render("signUp", {
    title: "Sign Up",
  });
};

exports.goals = (req, res) => {
  res.render("goals", {
    title: "Wellness Goals",
  });
};

exports.post_goals = (req, res) => {
  console.log("Processing entry");
  if (!req.body.date) {
    response.status(400).send("Entries must have author.");
    return;
  }
  db.addGoal(req.body.date, req.body.category, req.body.goal);
  res.redirect("/schedule");
};
promise.schedules().then((list) => {
  // const newList = list.sort((a, b) => a.time - b.time);
  console.log("Print list", list);
});
exports.schedule = (req, res) => {
  db.getSchedule()
    .then((list) => {
      const newList = list.sort((a, b) => a.time - b.time);
      res.render("schedule", {
        title: "Goal Schedule",
        schedule: newList,
      });
      console.log("Promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.show_by_category = (req, res) => {
  console.log("filtering schedule by", req.params.category);

  let category = req.params.category;
  db.getScheduleByCategory(category)
    .then((schedule) => {
      res.render("schedule", {
        title: "Goal Schedule",
        schedule: schedule,
      });
    })
    .catch((err) => {
      console.log("error handling schedule posts", err);
    });
};

exports.remove = (req, res) => {
  console.log("filtering remove by", req.params.date);

  let date = req.params.date;
  db.delete(date)
    .then((schedule) => {
      res.render("schedule", {
        title: "Goal Schedule",
        schedule: schedule,
      });
    })
    .catch((err) => {
      console.log("error handling author posts", err);
    });
};

exports.about_page = (req, res) => {
  res.status(200);
  res.redirect("html/about.html");
};
// Not found
exports.notFound = (req, res) => {
  res.status(404);
  res.render("notFound", {
    title: "Error 404",
  });
};

// internal server error
exports.serverError = (err, req, res, next) => {
  res.status(500);
  res.render("serverError", {
    title: "Error 500",
  });
};
