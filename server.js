const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose.connect(
  `${process.env.MONGOSTRING}`,
  () => {
    console.log("Connected");
  },
  (e) => console.log(e)
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
