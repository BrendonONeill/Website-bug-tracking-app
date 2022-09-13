const express = require('express')
const bugRouter = require('./routes/bugRoute')
const userRouter = require('./routes/userRoute')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const { updateUser } = require('./controllers/userController')
const User = require('./models/userModel')

const app = express()
app.use(methodOverride('_method'))
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`))
app.use("/bug", bugRouter)
app.use("/user", userRouter)




app.all('*', (req, res, next) => {
  try {
    console.log('hello im an error')
    throw new SyntaxError("This page doesn't exist")
  } catch (err) {
    next(err)
  }
  });
 
  app.use((err, req, res, next) => {
    (err.message.startsWith ('Email or Password not valid'))
    ? res.status(400).render('login/login',{message : 'Email or Password not valid'}):
    //res.status(404).render('login/login',{message : err.message });
    (err.message.endsWith ('Passwords are not the same') && req.type === 'create')
    ?res.status(400).render('users/createUser',{message : 'Passwords do not match', name: req.currentUser, currentUser : req.LogInUser}):
    (err.message.startsWith ('E11000'))
    ? res.status(400).render('users/createUser',{message : 'Email already used on another account', name: req.currentUser, currentUser : req.LogInUser}):
    (err.message.startsWith ('User validation failed'))
    ? res.status(400).render('users/createUser',{message : 'Passwords do not match', name: req.currentUser, currentUser : req.LogInUser}):
    (err.message.startsWith ('can you not read'))
    ?res.status(404).render('users/error',{message : "This page doesn't exist, Please try again later."}): 
    (err.message.startsWith ("This page doesn't exist"))
    ?res.status(404).render('users/error',{message : "This page doesn't exist, Please try again later.", name: req.currentUser, currentUser : req.LogInUser}): ""
  })

  
module.exports = app;