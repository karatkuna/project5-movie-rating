const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/search', {
    pageTitle: 'Search Movies'
  })
})


module.exports = router