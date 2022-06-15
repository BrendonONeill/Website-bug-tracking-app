const express = require('express')
const bugRouter = require('./routes/bugRoute')
const userRouter = require('./routes/userRoute')

const app = express()
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`))
app.use("/bug", bugRouter)
app.use("/user", userRouter)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));




app.all('*', (req, res, next) => {
    
  });
 
  
module.exports = app;