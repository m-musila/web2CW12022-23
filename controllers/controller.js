const { response, request } = require("express");
//Import model functionality
const goalDAO = require("../models/models.js");

// Create an instance of goals
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

// Set goals
exports.goals = (req, res) => {
  res.render("goals", {
    title: "Wellness Goals",
  });
};

exports.post_goals = (req, res) => {
  if (!req.body.date) {
    response.status(400).send("Provide dates for each entry");
    return;
  }
  db.addGoal(req.body.date, req.body.category, req.body.goal);
  res.redirect("/schedule");
};

// async used for functions handling promises (to simplify the syntax necessary to consume promises)
exports.schedule = async (req, res) => {
  db.getSchedule()
    .then((list) => {
      // Sort goals using {time} so that weekdays are always in order
      const newList = list.sort((a, b) => a.time - b.time);
      res.render("schedule", {
        title: "Goal Schedule",
        schedule: newList,
      });
      console.log("The promise resolved");
    })
    .catch((err) => {
      console.log("The promise rejected", err);
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
      console.log("The promise resolved");
    })
    .catch((err) => {
      console.log("Error handling schedule promise", err);
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
      console.log("The promise resolved");
    })
    .catch((err) => {
      console.log("Error handling author posts", err);
    });
};

exports.about_page = (req, res) => {
  res.status(200);
  res.redirect("html/about.html");
};
// Not found page
exports.notFound = (req, res) => {
  res.status(404);
  res.render("notFound", {
    title: "Error 404",
  });
};

// internal server error page
exports.serverError = (err, req, res, next) => {
  res.status(500);
  res.render("serverError", {
    title: "Error 500",
  });
};
