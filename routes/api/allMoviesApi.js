const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  axios
    .get("/discover/movie?api_key=" + process.env.TMDB_API_KEY)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
