const jwt = require('jsonwebtoken');
const CartItem = require('../Models/CartItems'); 
const Product = require('../Models/Product'); 


const AddToCart = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    // Verify and decode the token to get the userId
    const decoded = jwt.verify(token, 'SECRET'); // Replace with your actual secret or env variable  
    const UserId = decoded.userId; // Assuming token contains `userId`

    const { ProductId, Quantity } = req.body;

    if (Quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0.' });
    }

    // Check if the product exists
    const product = await Product.findById(ProductId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Check if the product is already in the cart for the same user
    let cartItem = await CartItem.findOne({ UserId, ProductId });

    if (cartItem) {
      // Update the Quantity and TotalPrice if the product is already in the cart
      cartItem.Quantity += Quantity;
      cartItem.TotalPrice = cartItem.Quantity * product.Price;
     var result= await cartItem.save(); // Corrected this line
      return res.status(201).json({ message: 'Cart updated successfully.', cartItem });
    } else {
      // Create a new cart entry
      cartItem = new CartItem({
        UserId,
        ProductId,
        Quantity,
        Price: product.Price,
        TotalPrice: Quantity * product.Price,
      });

      await cartItem.save();
      return res.status(201).json({ message: 'Product added to cart successfully.', cartItem });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
const GetCartItems = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token ',token)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }
    const decoded = jwt.verify(token, 'SECRET'); 
    const UserId = decoded.userId; 

    const cartItems = await CartItem.find({ UserId }).populate('ProductId'); 
console.log("cartitems",cartItems)
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'No cart items found.' });
    }
    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};
const DeleteCartItem = async (req, res) => {
  const { id } = req.params; 
  try {
      const cartItem = await CartItem.findById(id);
      if (!cartItem) {
          return res.status(404).json({ message: 'Wishlist not found' });
      }
      await CartItem.findByIdAndDelete(id);

      res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ message: 'Error deleting product', error: err });
  }
};
module.exports = { AddToCart ,GetCartItems ,DeleteCartItem};
