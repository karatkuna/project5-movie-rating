const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const userId = req.session.userId || "" ;
  const firstname = req.session.firstname || "" ;
  res.render('pages/search', {
    pageTitle: 'Search Movies',
    userId,
    firstname,
  })
})


module.exports = router