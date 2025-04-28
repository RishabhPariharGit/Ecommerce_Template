const mongoose = require('mongoose');
//const SubcategoryModel = require('../Models/SubCategory');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://rishabhgit1704:Rentalmanagement123@rentalmgmt.qoi0sqo.mongodb.net/Ecommerce_template`);
    // const result = await SubcategoryModel.updateMany(
    //   {}, // no filter, update all
    //   { 
    //     $set: {
    //       Show_In_Colletion_Grid: false,
    //       ISLandscape: false
    //     }
    //   }
    // );
    // console.log(`Updated ${result.modifiedCount} subcategories successfully.`);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
}

module.exports = connectDB;





