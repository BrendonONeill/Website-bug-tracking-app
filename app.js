const express = require('express')
const bugRouter = require('./routes/bugRoute')
const userRouter = require('./routes/userRoute')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const { updateUser } = require('./controllers/userController')
const User = require('./models/userModel')
const { errorHandler } = require('./controllers/errorController')

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

app.use(errorHandler)

module.exports = app;