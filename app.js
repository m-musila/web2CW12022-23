const express = require("express");
const mustache = require("mustache-express");
require("dotenv").config(); // loads .env data
const cookieParser = require("cookie-parser");

const path = require("path");

const app = express();
const port = 3000;
app.use(cookieParser());
const public = path.join(__dirname, "public");
app.use(express.static(public));
app.use(express.urlencoded({ extended: false }));

// Create and register mustache engine as the template for this application.
app.engine("mustache", mustache());
app.set("view engine", "mustache");

// import routes to app.js
const router = require("./routes/routes");
app.use("/", router);

app.listen(port, () => {
  console.log(`The server has started on port: ${port}. Ctrl^c to quit`);
});
