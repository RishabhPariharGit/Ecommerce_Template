const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Name: { type: String, required: true },
  Mobile: { type: String, required: true },
  PinCode: { type: String, required: true },
  Address: { type: String, required: true },
  Locality: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  IsDefault: { type: Boolean, default: false },
  Type: { type: String, enum: ['Home', 'Work'], required: true },
});


const AddressModel = mongoose.model('Address', AddressSchema);
module.exports = AddressModel;