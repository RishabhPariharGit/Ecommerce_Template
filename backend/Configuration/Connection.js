const mongoose = require('mongoose')

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://rishabhgit1704:Rentalmanagement123@rentalmgmt.qoi0sqo.mongodb.net/`);
      console.log(`MongoDB Connected`);
    } catch (error) {
      
      console.log("Unable to connect to mongo db");
    
    }
  }

  module.exports = connectDB;