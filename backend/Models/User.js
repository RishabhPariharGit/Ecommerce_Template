const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Name: { type: String, required: true, trim: true },
  Username: { type: String, unique: true, trim: true },
  Email: { type: String, unique: true, required: true, trim: true },
  Phone: { type: String, unique: true, required: true, trim: true },
  Password: { type: String, required: true },
  DateOfBirth: { type: Date, default: null },  // Optional Date of Birth
  AgreedToTerms: { type: Boolean },  // Agreement to Terms (must be true for account creation)
  IsAdmin: { type: Boolean, default: false },
  IsSystemAdmin: { type: Boolean, default: false },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
