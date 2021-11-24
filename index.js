require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require('express-flash')
const bcrypt = require("bcryptjs");

const morgan = require("morgan");
//app define before router
const loginRouter = require('./routes/login')
//const logoutRouter = require('./routes/logout')
const usersRouter = require('./routes/users')
const homeroute = require("./routes/home");
//const moviesroute = require("./routes/movies");
const errorRouter = require('./routes/error')

const app = express()

const PORT = process.env.PORT || 3000;

// JSON and form parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));



app.use(flash())


// session config
app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    name: "moviedb_sid",
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
  })
);

// ROUTES
app.use('/login', loginRouter)
//app.use('/logout', logoutRouter)
//app.use("/movies", moviesroute);

app.use('/users', usersRouter)

app.use("/", homeroute);
app.use('*', errorRouter)

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
