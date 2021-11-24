const express = require('express')
const db = require('../database')
const bcrypt = require('bcryptjs')
const router = express.Router()
const session =require('express-session')
const flash =require('express-flash')

router.use(flash())

const firstnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ -'\.]+$/
const lastnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ -'\.]+$/

const emailRegex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordRegex = /^[a-zA-Z0-9]{4,15}$/

const isValid = (value, regex) => {
  return regex.test(value)
}
  
const cleanEmail = (email) => {
  return email ? email.toLowerCase().trim() : ""
}

router.get('/new', (req, res) => {

  res.render('pages/register', {
   errors: req.flash("error")
  })
})


router.post('/new', (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body
    const cleanedEmail = cleanEmail(email)
   
   
  
    if (!firstname||!lastname||!email || !password || !confirmPassword )  req.flash("error", "Please enter all fields")
    if (!isValid(cleanedEmail, emailRegex)) req.flash("error", "Email not valid")
    if (!isValid(password, passwordRegex)) req.flash("error", "Password must be 6 characters or more")
    if (password !== confirmPassword)   req.flash("error", "Passwords don't match")
  
    console.log(req.session)
    if (req.session.flash.error && req.session.flash.error.length > 0) return res.redirect("/users/new")
  
    db.oneOrNone('SELECT email FROM users WHERE email = $1;', [cleanedEmail])
    .then((user) => {
      if (user) return res.send("User already exists")
  
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
  
      db.none('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', [firstname, lastname, cleanedEmail, hash])
  
      .then(() => {
        res.redirect('/login')
      })
      
      .catch((err) => {
        console.log(err)
        res.redirect('/')
      })
    })
  
    .catch((err) => {
      // error checking whether the email exists
      console.log(err)
      res.send(err.message)
    })
  })
  
  module.exports= router