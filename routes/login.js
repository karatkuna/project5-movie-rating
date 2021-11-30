const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../database')
const { redirectToHome } = require('./middleware/redirect')
const router = express.Router()


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passwordRegex = /^[^<>]{6,}$/

const isValid = (value, regex) => {
  return regex.test(value)
}

const cleanEmail = (email) => {
  return email ? email.toLowerCase().trim() : ""
}

router.post('/register', (req, res) => {
  console.log("hello")
  const {firstname, lastname, email, password} = req.body
  const cleanedEmail = cleanEmail(email)

  // 1. Validate!
  if(!email || !password) return res.send("Please enter all fields")
  if (!isValid(cleanedEmail, emailRegex) || !isValid(password, passwordRegex)) return res.send("Email or password not valid")
  if (!isValid(password, passwordRegex)) res.send("Password must be 6 characters or more")
  
  // 2. Check if email already exists
  
  db.oneOrNone('SELECT email from users WHERE email = $1;', [cleanedEmail])

  .then(user => {
    if(user) return res.send("User already exists")

    // 3. If all valid and email doesn't already exist, hash password and insert into db

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    
    db.none('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname,lastname, cleanedEmail, hash])
  
    .then(() => {
      res.send({
        email: cleanedEmail,
        password: hash
      })
    })
  
    .catch((err) => { 
      console.log(err.message)
      res.send(err.message)
    })
    
  })

  .catch(err => {
    console.log(err)
    res.send(err.message)
  })

})

// display login form
router.get('/', redirectToHome, (req, res) => {
  res.clearCookie('moviedb_sid')
  res.render('pages/login', {
    errors: req.flash("error"),
    pageTitle: 'Login',
  })
})

router.post('/', redirectToHome, (req, res) => {
  console.log(req.session)
  const {email, password} = req.body
  const cleanedEmail = cleanEmail(email)

  // 1. validate email
  if (!email || !password) req.flash("error", "Please enter both email and password")
  if(!isValid(cleanedEmail, emailRegex)) req.flash("error", "Email is not valid")

  if (req.session.flash.error && req.session.flash.error.length > 0) return res.redirect("/login")

  
  // 2. does user exist?
  db.oneOrNone('SELECT * FROM users WHERE email=$1;', [cleanedEmail])
  .then(user => {
    if(!user) {
      req.flash("error", "Credentials are not correct")
      return res.redirect('/login')
    }

    // 3. if so, is password correct?
    const checkPassword = bcrypt.compareSync(password, user.password)
    if(!checkPassword) {
      req.flash("error", "Credentials are not correct")
      return res.redirect('/login')
    }

    // 4. user is valid!!!
    req.session.userId = user.id
    req.session.firstname = user.firstname
    console.log(req.session)
  

    res.redirect('/')
    // User ID can be accessed on any route
  })

  .catch(err => {
    console.log(err)
    res.send(err.message)
  })
})

module.exports = router