const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:movie_id", (req, res) => {
  axios
    .get(`/movie/${req.params.movie_id}?api_key=${process.env.TMDB_API_KEY}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
