const bcrypt = require("bcrypt");
const userModel = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.signin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  userModel.userLookup(email, (err, user) => {
    if (err) {
      console.log("Error checking email in db", err);
      return res.status(401).send();
    }
    if (!email) {
      console.log("email", email, " does not exist");
      return res.render("/signup");
    }
    //verify password with db values
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        //store email in payload.
        let payload = { email: user.email };
        //token for access
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: 300,
        });
        res.cookie("jwt", accessToken);
        next();
      } else {
        return res.render("/signin");
      }
    });
  });
};
exports.verify = (req, res, next) => {
  let accessToken = req.cookies.jwt;
  if (!accessToken) {
    return res.status(403).send();
  }
  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    //reauthorization error
    res.status(401).send();
  }
};
