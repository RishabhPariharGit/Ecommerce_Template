const jwt = require('jsonwebtoken');
const CartItem = require('../Models/CartItems'); 
const Product = require('../Models/Product'); 
const mongoose = require('mongoose');

const AddToCart = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    let UserId = null;
    let GUID = null;

    // Verify token if it exists
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'SECRET' with your actual secret key
        UserId = decoded.userId; // Assuming token contains `userId`
      } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
      }
    } else {
      // Retrieve GUID from the request headers or cookies if no token
      GUID = req.headers['x-anonymous-id'] || req.cookies.guid;
      if (!GUID) {
        return res.status(401).json({ message: 'Unauthorized: No token or GUID provided.' });
      }
    }

    const { ProductId, Quantity } = req.body;

    if (Quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0.' });
    }

    // Check if the product exists
    const product = await Product.findById(ProductId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Build query to check for an existing cart item
    const query = UserId ? { UserId, ProductId } : { GUID, ProductId };

    // Check if the product is already in the cart for the user or GUID
    let cartItem = await CartItem.findOne(query);

    if (cartItem) {
      // Update the Quantity and TotalPrice if the product is already in the cart
      cartItem.Quantity += Quantity;
      cartItem.TotalPrice = cartItem.Quantity * product.Price;
      const result = await cartItem.save();
      return res.status(201).json({ message: 'Product added to cart successfully.', cartItem });
    } else {
      // Create a new cart entry
      cartItem = new CartItem({
        UserId,
        GUID,
        ProductId,
        Quantity,
        Price: product.Price,
        TotalPrice: Quantity * product.Price,
      });

      await cartItem.save();
      return res.status(201).json({ message: 'Product added to cart successfully.', data: cartItem});
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const GetCartItems = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    const guid = req.headers['x-anonymous-id']; 
    if (!token && !guid) {
      return res.status(400).json({ message: 'Unauthorized: Token or GUID is required.' });
    }

    let filter = {}; 

    if (token) {     
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const UserId = decoded.userId;
      filter.UserId = UserId; 
    } else if (guid) {     
      filter.GUID = guid;
    }
    const cartItems = await CartItem.find(filter).populate('ProductId'); // Populate product details if needed
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'No cart items found.' });
    }

    return res.status(200).json({ cartItems }); // Return cart items in response
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

const MergeCartItems = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const UserId = decoded.userId;
    const { GUID } = req.body;
console.log(GUID)
    if (!GUID) {
      return res.status(400).json({ message: 'GUID is required for merging cart items.' });
    }
    const guidCartItems = await CartItem.find({ GUID });

    for (const item of guidCartItems) {
      let existingItem = await CartItem.findOne({ UserId, ProductId: item.ProductId });

      if (existingItem) {
        existingItem.Quantity += item.Quantity;
        existingItem.TotalPrice = existingItem.Quantity * existingItem.Price;
        await existingItem.save();
      } else {
        item.UserId = UserId; 
        item.GUID = null; 
        await item.save();
      }
    }
    await CartItem.deleteMany({ GUID });

    res.status(200).json({ message: 'Cart items merged successfully.' });
  } catch (error) {
    console.error('Error merging cart items:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};




const GetCartItemsCount = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const guid = req.headers['x-anonymous-id'];

    if (!token && !guid) {
      return res.status(400).json({ message: 'Unauthorized: Token or GUID is required.' });
    }

    let filter = {};

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const UserId = decoded.userId;
      filter.UserId = new mongoose.Types.ObjectId(UserId);  // 👈 convert to ObjectId
    } else if (guid) {
      filter.GUID = guid;
    }

    const result = await CartItem.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$Quantity' }
        }
      }
    ]);

    const totalQuantity = result.length > 0 ? result[0].totalQuantity : 0;

    return res.status(200).json({
      message: "Successfully retrieved total quantity",
      data: totalQuantity
    });

  } catch (error) {
    console.error('Error fetching cart item count:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};



module.exports = { AddToCart ,GetCartItems ,DeleteCartItem,MergeCartItems,GetCartItemsCount};
