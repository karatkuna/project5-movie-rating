require("dotenv").config();
const express = require("express");

const session = require("express-session");
<<<<<<< HEAD
const flash = require('express-flash')
const bcrypt = require("bcryptjs");
=======
// const flash = require('express-flash')
//const bcrypt = require("bcryptjs");
//const db = require("./database");
>>>>>>> e87ffcf6d7dc6fe91a7a0ef0ab65b151bfa71f45

const morgan = require("morgan");

//app define before router
<<<<<<< HEAD
const loginRouter = require('./routes/login')
//const logoutRouter = require('./routes/logout')
const usersRouter = require('./routes/users')
const homeroute = require("./routes/home");
//const moviesroute = require("./routes/movies");
const errorRouter = require('./routes/error')

const app = express()
=======
>>>>>>> e87ffcf6d7dc6fe91a7a0ef0ab65b151bfa71f45

const axios = require("axios");
const homeRouter = require("./routes/home");
const searchRoute = require("./routes/search");
const moviesRouter = require("./routes/movies");
const moviesApiRouter = require("./routes/api/allMoviesApi");
const singleMovieApiRouter = require("./routes/api/singleMovieApi");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(flash())
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
<<<<<<< HEAD
    name: "moviedb_sid",
=======
    name: "project5_sid",
>>>>>>> e87ffcf6d7dc6fe91a7a0ef0ab65b151bfa71f45
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
  })
<<<<<<< HEAD
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
=======
)

// Cofigure axios to only request the movie db
axios.defaults.baseURL = "https://api.themoviedb.org/3";
// Routes
// app.use("/movies", moviesRouter);
// app.use("/api/all-movies", moviesApiRouter);
// app.use("/api/single-movie", singleMovieApiRouter);
app.use("/", homeRouter);
app.use("/search", searchRoute);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
>>>>>>> e87ffcf6d7dc6fe91a7a0ef0ab65b151bfa71f45
