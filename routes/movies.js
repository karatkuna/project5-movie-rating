const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/:id", (req, res) => {
  db.any(
    "SELECT id, comment, movie_id, TO_CHAR(created_at, 'HH12:MI AM, DD Mon YYYY') created_at FROM comments WHERE movie_id = $1 ORDER BY created_at DESC",
    [req.params.id]
  )
    .then((comments) => {
      res.render("pages/single-movie", {
        pageTitle: "Single Movie",
        movie_id: req.params.id,
        comments: comments,
      });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

router.post("/:id", (req, res) => {
  // Validate here

  db.one(
    "INSERT INTO comments (comment, movie_id) VALUES ($1, $2) RETURNING id, comment, movie_id, TO_CHAR(created_at, 'HH12:MI AM, DD Mon YYYY') created_at",
    [req.body.comment, req.params.id]
  )
    .then((data) => {
      res.send({
        ...data,
        success: true,
      });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
