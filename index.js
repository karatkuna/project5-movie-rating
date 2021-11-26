require("dotenv").config();
const express = require("express");

const session = require("express-session");
const flash = require('express-flash')
const bcrypt = require("bcryptjs");
const db = require("./database");
const morgan = require("morgan");

//app define before router
const loginRouter = require('./routes/login')
//const logoutRouter = require('./routes/logout')
const usersRouter = require('./routes/users')
const errorRouter = require('./routes/error')



const axios = require("axios");
const homeRouter = require("./routes/home");
const searchRoute = require("./routes/search");
const moviesRouter = require("./routes/movies");
const moviesApiRouter = require("./routes/api/allMoviesApi");
const singleMovieApiRouter = require("./routes/api/singleMovieApi");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.set("view engine", "ejs");




app.use(flash())


// session config
app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    name: "project5_sid",
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
  })
);

// ROUTES
app.use('/login', loginRouter)
//app.use('/logout', logoutRouter)

app.use('/users', usersRouter)
app.use('*', errorRouter)



// Cofigure axios to only request the movie db
axios.defaults.baseURL = "https://api.themoviedb.org/3";
// Routes
app.use("/movies", moviesRouter);
app.use("/api/all-movies", moviesApiRouter);
app.use("/api/single-movie", singleMovieApiRouter);
app.use("/", homeRouter);
app.use("/search", searchRoute);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
