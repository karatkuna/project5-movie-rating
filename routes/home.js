const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/home', {
    pageTitle: 'Home Page'
  })
})


<<<<<<< HEAD
module.exports = router
=======
module.exports = router

>>>>>>> e87ffcf6d7dc6fe91a7a0ef0ab65b151bfa71f45
