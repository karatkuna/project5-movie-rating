const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/home', {
    pageTitle: 'Home Page',
    display: 'allMovies'
  })
})


module.exports = router