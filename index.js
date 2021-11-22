require("dotenv").config();
const express = require("express");
const session = require("express-session");

const bcrypt = require("bcryptjs");
const db = require("./database");
const morgan = require("morgan");
//app define before router
const app = express();
const homeroute = require("./routes/home");
const moviesroute = require("./routes/movies");

const PORT = process.env.PORT || 3000;

// JSON and form parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// session config
app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    name: "mrcoffee_sid",
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
  })
);

// ROUTES

app.use("/movies", moviesroute);

app.use("/", homeroute);

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
