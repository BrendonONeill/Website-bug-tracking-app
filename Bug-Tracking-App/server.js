const dotenv = require('dotenv')
const mongoose = require("mongoose")

dotenv.config({path: './config.env'})
const app = require('./app');

////////////////////////// 
//const DB = process.env.DATABASE.replace(
//    '<PASSWORD>',
//    process.env.DATABASE_PASSWORD
//  );
/////////////////////////
mongoose.connect('', () =>{
    console.log("Connected")
}, e => console.log(e));



const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});