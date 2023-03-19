const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
  try {
   const conn = await mongoose.connect(mongoURI);
   if(conn) console.log(`connect to database`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
