const jwt = require('jsonwebtoken');
const CartItem = require('../Models/CartItems'); // Adjust path as needed
const Product = require('../Models/Product'); // Adjust path as needed

const Wishlist = require('../Models/Wishlist ');

const AddToCart = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    // Verify and decode the token to get the userId
    const decoded = jwt.verify(token, 'SECRET'); // Replace with your actual secret or env variable
    console.log("decoded", decoded);
    const UserId = decoded.userId; // Assuming token contains `userId`
    console.log("userid", UserId);

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
    console.log("cartitem", cartItem);

    if (cartItem) {
      // Update the Quantity and TotalPrice if the product is already in the cart
      cartItem.Quantity += Quantity;
      cartItem.TotalPrice = cartItem.Quantity * product.Price;
      console.log("cart1",cartItem)
     var result= await cartItem.save(); // Corrected this line
     console.log("result",result)
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



const AddToWishlist = async (req, res) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    // Verify and decode the token to get the userId
    const decoded = jwt.verify(token, 'SECRET'); // Replace with your actual secret or env variable
    console.log("decoded", decoded);
    const UserId = decoded.userId; // Assuming token contains `userId`
    console.log("userid", UserId);
    const {  ProductId } = req.body;

    // Check if the product is already in the user's wishlist
    const existingEntry = await Wishlist.findOne({ UserId, ProductId });
    if (existingEntry) {
      return res.status(400).json({ message: 'Product is already in wishlist' });
    }

    const newWishlistEntry = new Wishlist({ UserId, ProductId });
    await newWishlistEntry.save();
    res.status(201).json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { AddToCart ,AddToWishlist};
