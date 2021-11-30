const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/:id", (req, res) => {
  const movie_id = req.params.id
  db.any(`SELECT t.id, rating, comment, TO_CHAR(created_at, 'YYYY-MM-DD') created_at, firstname FROM tblmoviesrating t JOIN users u ON u.id=t.user_id WHERE t.movie_id=$1 ORDER BY t.id DESC`, [movie_id])
  .then((rating) => {
    res.render("pages/single-movie", {
      pageTitle: 'Single movie',
      movie_id,
      rating
    })

  })
  .catch((error) => {
    console.log(error)
    res.render('pages/error',{
      message:error.message
    })
  })
  
});

router.post("/:id", (req, res) => {
  // Validate here
  

  console.log("in post movies");
  console.log(req.body);

  if (req.body.userrating !== undefined && req.body.comment !== undefined) {
    const user_id = 1
    const movie_id = req.params.id
    let comment = req.body.comment
    const rating = req.body.userrating

    if(comment.length < 200){
      for(let i = 0; i < 200; i++ ) {
        comment += "-"
      }
    }

    console.log(comment);

    db.one(
      "INSERT INTO tblmoviesrating (rating, movie_id, user_id, comment) VALUES ($1, $2, $3, $4) RETURNING id, rating, comment, TO_CHAR(created_at, 'HH12:MI AM, DD Mon YYYY') created_at",
      [rating, movie_id, user_id, comment]
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
  } 
})

module.exports = router
