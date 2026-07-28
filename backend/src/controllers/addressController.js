const Address = require("../models/Address");

// Get all addresses for logged-in user
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add a new address
exports.addAddress = async (req, res) => {
  try {
    const { fullName, phone, address, city, pincode, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    await Address.create({
      user: req.user._id,
      fullName,
      phone,
      address,
      city,
      pincode,
      isDefault: !!isDefault,
    });

    const addresses = await Address.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(201).json({
      success: true,
      message: "Address added",
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update an existing address
exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { fullName, phone, address, city, pincode, isDefault } = req.body;

    const existing = await Address.findOne({
      _id: addressId,
      user: req.user._id,
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    existing.fullName = fullName;
    existing.phone = phone;
    existing.address = address;
    existing.city = city;
    existing.pincode = pincode;
    existing.isDefault = !!isDefault;

    await existing.save();

    const addresses = await Address.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Address updated",
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const existing = await Address.findOneAndDelete({
      _id: addressId,
      user: req.user._id,
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const addresses = await Address.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Address deleted",
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};