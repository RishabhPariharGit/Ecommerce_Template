const mongoose = require('mongoose');
const { Schema } = mongoose;
const CommonFieldsSchema = require('./CommonFields');

const wishlistSchema = new Schema({
  UserId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  ProductId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  audit: CommonFieldsSchema
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
