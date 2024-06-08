const mongoose = require("mongoose");
const db =
  "mongodb+srv://rishabhgit1704:Rentalmanagement123@rentalmgmt.qoi0sqo.mongodb.net/";
/* Replace <password> with your database password */

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error("Unable to connect to MongoDB");
    process.exit(1);
  }
};
module.exports = connectDB;


// const mongoose = require('mongoose')

// const connectDB = async () => {
//     try {
//       const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/Rentalmanagement`);
//       console.log(`MongoDB Connected: {conn.connection.host}`);
//     } catch (error) {
      
//       console.error(error.message);
    
//     }
//   }

//   module.exports = connectDB;