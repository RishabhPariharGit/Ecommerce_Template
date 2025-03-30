const mongoose = require('mongoose');
const { Schema } = mongoose;
const CommonFieldsSchema = require('./CommonFields');

const cartItemSchema = new Schema({
  UserId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }, 
  GUID: { 
    type: String, 
    required: function () {
      return !this.UserId; 
    },
  },
  ProductId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  Quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  Price: { 
    type: Number, 
    required: true 
  },
  TotalPrice: { 
    type: Number, 
    required: true 
  },
  audit: CommonFieldsSchema
});

// Update the `UpdatedAt` field automatically on save
cartItemSchema.pre('save', function (next) {
  this.UpdatedAt = Date.now();
  next();
});

const Cart = mongoose.model('CartItem', cartItemSchema);

module.exports = Cart;
