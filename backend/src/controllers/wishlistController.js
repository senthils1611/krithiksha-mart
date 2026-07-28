const User = require("../models/User");

// Get logged-in user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add a product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    const updatedUser = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({
      success: true,
      message: "Added to wishlist",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove a product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};