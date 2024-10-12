const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://rishabhgit1704:Rentalmanagement123@rentalmgmt.qoi0sqo.mongodb.net/Ecommerce_template`);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
}

module.exports = connectDB;
