const express = require('express')
const bugRouter = require('./routes/bugRoute')
const userRouter = require('./routes/userRoute')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')

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
    
  });
 
  
module.exports = app;