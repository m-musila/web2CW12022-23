const { response, request } = require("express");
//Import model functionality
const goalDAO = require("../models/models.js");
const userDao = require("../models/user.js");

// Create an instance of goals
const db = new goalDAO("database/goal.db");
const userDB = new goalDAO("database/user.db");

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

// render goals
exports.goals = (req, res) => {
  res.render("goals", {
    title: "Wellness Goals",
  });
};

exports.update = (req, res) => {
  res.render("update", {
    title: "Update Goal",
  });
};

exports.remove = (req, res) => {
  res.render("remove", {
    title: "Remove Goal",
  });
};

exports.post_goals = (req, res) => {
  db.addGoal(req.body.date, req.body.category, req.body.goal);
  res.redirect("/schedule");
};

exports.post_update = (req, res) => {
  db.updateGoal(req.body.date, req.body.category, req.body.goal);
  res.redirect("/schedule");
};

exports.post_remove = (req, res) => {
  if (!req.body.date) {
    response.status(400).send("Provide dates for each entry");
    return;
  }
  db.removeGoal(req.body.date, req.body.category);
  res.redirect("/schedule");
};

// async used for functions handling promises (to simplify the syntax necessary to consume promises)
exports.schedule = async (req, res) => {
  const goals = await db.getSchedule().catch((err) => {
    console.log("Error handling schedule promise", err);
  });
  const schedule = await goals.sort((a, b) => a.time - b.time);
  res.render("schedule", {
    title: "Goal Schedule",
    schedule: schedule,
  });
  console.log("The promise resolved");
};

exports.show_by_category = async (req, res) => {
  console.log("filtering schedule by", req.params.category);

  let category = req.params.category;
  const schedule = await db.getScheduleByCategory(category).catch((err) => {
    console.log("Error handling schedule promise", err);
  });
  res.render("schedule", {
    title: `${category} Goals`,
    schedule: schedule,
  });
  console.log("The promise resolved");
};

exports.post_sign_up = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(404);
    res.render("notFound", {
      title: "Error 404",
    });
    return;
  }
  userDao.userLookup(email, function (err, e) {
    if (e) {
      res.status(500);
      res.render("serverError", {
        title: "Error 500",
      });
      return;
    }
    userDao.addUser(email, password);
    console.log("added email", email, "password", password);
    res.redirect("/signin");
  });
};

exports.handle_signin = (req, res) => {
  res.render("goals", { title: "New goal", user: "user" });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt").status(200).redirect("/");
};
exports.about_page = (req, res) => {
  res.status(200);
  res.redirect("html/about.html");
};
exports.landing_page = (req, res) => {
  res.status(200);
  res.redirect("html/index.html");
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
