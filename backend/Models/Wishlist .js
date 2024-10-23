const mongoose = require('mongoose');
const { Schema } = mongoose;

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
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
