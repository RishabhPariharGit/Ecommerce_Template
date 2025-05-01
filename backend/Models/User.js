const mongoose = require("mongoose");
const CommonFieldsSchema = require('./CommonFields');

const UserSchema = mongoose.Schema({
  FirstName: { type: String, required: true, trim: true },
  LastName: { type: String, required: true, trim: true },
  Username: { type: String, unique: true, trim: true },
  Email: { type: String, unique: true, required: true, trim: true },
  Phone: { type: String, unique: true, required: true, trim: true },
  AlternatePhone: { type: String },
  Gender: { type: String},
  Password: { type: String, required: true },
  DateOfBirth: { type: Date, default: null },  // Optional Date of Birth
  AgreedToTerms: { type: Boolean },  // Agreement to Terms (must be true for account creation)
  IsAdmin: { type: Boolean, default: false },
  IsSystemAdmin: { type: Boolean, default: false },
  audit: CommonFieldsSchema
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
