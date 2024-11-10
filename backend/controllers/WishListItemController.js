const jwt = require('jsonwebtoken');
const Wishlist = require('../Models/Wishlist ');

const AddToWishlist = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }
    const decoded = jwt.verify(token, 'SECRET'); 
    const UserId = decoded.userId;
    const {  ProductId } = req.body;
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
const GetWishListItems = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token ',token)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }
    const decoded = jwt.verify(token, 'SECRET'); 
    const UserId = decoded.userId; 

    const WishlistItems = await Wishlist.find({ UserId }).populate('ProductId'); 
    if (!WishlistItems || WishlistItems.length === 0) {
      return res.status(404).json({ message: 'No cart items found.' });
    }
    return res.status(200).json({ WishlistItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};
const DeleteWishlistItem = async (req, res) => {
  const { id } = req.params; 
  console.log("id", req.params);
  try {
      const wishlistItem = await Wishlist.findById(id);
      console.log("Wishlist", wishlistItem);
      if (!wishlistItem) {
          return res.status(404).json({ message: 'Wishlist not found' });
      }
      await Wishlist.findByIdAndDelete(id);

      res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ message: 'Error deleting product', error: err });
  }
};

module.exports = {AddToWishlist,GetWishListItems,DeleteWishlistItem};
