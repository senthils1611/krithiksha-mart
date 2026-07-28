const Category = require("../models/Category");
const Product = require("../models/Product");

// Get all categories, with real product counts attached
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    const productCounts = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const countMap = {};
    productCounts.forEach((c) => {
      countMap[c._id] = c.count;
    });

    const categoriesWithCounts = categories.map((cat) => ({
      _id: cat._id,
      name: cat.name,
      description: cat.description,
      color: cat.color,
      isActive: cat.isActive,
      createdAt: cat.createdAt,
      productCount: countMap[cat.name] || 0,
    }));

    res.status(200).json({
      success: true,
      count: categoriesWithCounts.length,
      categories: categoriesWithCounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add a new category — admin only
exports.addCategory = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A category with this name already exists",
      });
    }

    const category = await Category.create({
      name,
      description,
      color,
    });

    res.status(201).json({
      success: true,
      message: "Category added",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a category — admin only. Renaming cascades to all products using the old name.
exports.updateCategory = async (req, res) => {
  try {
    const { name, description, color, isActive } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const oldName = category.name;

    if (name && name !== oldName) {
      const existing = await Category.findOne({ name });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A category with this name already exists",
        });
      }
      category.name = name;
    }

    if (description !== undefined) category.description = description;
    if (color !== undefined) category.color = color;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    // Cascade the rename to every product currently using the old category name
    let updatedProductCount = 0;
    if (name && name !== oldName) {
      const result = await Product.updateMany(
        { category: oldName },
        { $set: { category: name } }
      );
      updatedProductCount = result.modifiedCount;
    }

    res.status(200).json({
      success: true,
      message:
        updatedProductCount > 0
          ? `Category updated. ${updatedProductCount} product(s) updated to match.`
          : "Category updated",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a category — admin only. Products keep their existing category text (not a hard reference).
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const productCount = await Product.countDocuments({
      category: category.name,
    });

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message:
        productCount > 0
          ? `Category deleted. ${productCount} product(s) still reference "${category.name}" but the category is no longer managed.`
          : "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};