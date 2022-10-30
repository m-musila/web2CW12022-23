const { response } = require("express");
// const dataAccessObject = require();

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
