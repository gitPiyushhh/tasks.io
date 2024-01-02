const mongoose = require("mongoose");

/*
  Env variables
*/
const DATABASE = "mongodb+srv://piyushhh:<PASSWORD>@tasks.wz82puo.mongodb.net/?retryWrites=true"
const DATABASE_PASSWORD = "Password"
const PORT = process.env.PORT ||  8000

const app = require("./app");

const DB = DATABASE.replace(
  "<PASSWORD>",
  DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Successfully connected to DB"));

  
const server = app.listen(PORT, () => {
  console.log(`App running on port - ${PORT}`);
});
