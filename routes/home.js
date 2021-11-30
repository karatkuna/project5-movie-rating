const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log("blue")
  console.log(req.session.userId)
  const userId = req.session.userId || "" ;
  const firstname = req.session.firstname || "" ;

  res.render('pages/home', {
    pageTitle: 'Home Page',
    userId,
    firstname
  })
})


module.exports = router

