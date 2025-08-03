import mongoose from "mongoose";

const dbconnection = mongoose
  .connect("mongodb://localhost:27017/userDB")
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => [console.log(error)]);

export default dbconnection;
