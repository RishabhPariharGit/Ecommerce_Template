const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
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
  CreatedAt: { 
    type: Date, 
    default: Date.now 
  },
  UpdatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the `updatedAt` field automatically on save
cartItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model('CartItem', cartItemSchema);

module.exports = Cart;
