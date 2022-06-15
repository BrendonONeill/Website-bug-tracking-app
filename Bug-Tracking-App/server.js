const dotenv = require('dotenv')
const mongoose = require("mongoose")
const app = require('./app');



dotenv.config({path: './config.env'})

////////////////////////// 
//const DB = process.env.DATABASE.replace(
//    '<PASSWORD>',
//    process.env.DATABASE_PASSWORD
//  );
/////////////////////////
mongoose.connect(process.env.mongo, () =>{
    console.log("Connected")
}, e => console.log(e));



const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});