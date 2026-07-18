const User = require("../models/User");

exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.updateMe = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------- Wishlist ----------

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

exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.wishlist.some((id) => id.toString() === req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }

    await user.populate("wishlist");

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

exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );
    await user.save();
    await user.populate("wishlist");

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

// ---------- Addresses ----------

exports.getAddresses = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    addresses: user.addresses,
  });
};

exports.addAddress = async (req, res) => {
  try {
    const { fullName, phone, address, city, pincode, isDefault } = req.body;

    if (!fullName || !phone || !address || !city || !pincode) {
      return res.status(400).json({
        success: false,
        message: "All address fields are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (isDefault || user.addresses.length === 0) {
      user.addresses.forEach((a) => (a.isDefault = false));
    }

    user.addresses.push({
      fullName,
      phone,
      address,
      city,
      pincode,
      isDefault: isDefault || user.addresses.length === 0,
    });

    await user.save();

    res.status(201).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const addr = user.addresses.id(req.params.addressId);

    if (!addr) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const { fullName, phone, address, city, pincode, isDefault } = req.body;

    if (fullName) addr.fullName = fullName;
    if (phone) addr.phone = phone;
    if (address) addr.address = address;
    if (city) addr.city = city;
    if (pincode) addr.pincode = pincode;

    if (isDefault) {
      user.addresses.forEach((a) => (a.isDefault = false));
      addr.isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.addresses = user.addresses.filter(
      (a) => a._id.toString() !== req.params.addressId
    );

    await user.save();

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
