const Category = require('../models/categoryModel');
const slugify = require('slugify');

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    const { name, parentId, image } = req.body;
    const category = new Category({
        name,
        slug: slugify(name),
        parentId,
        image
    });
    try {
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        // Basic logic to construct tree can be done here or frontend
        // For now returning flat list, frontend can reconstruct tree
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
    const { name, parentId, image } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            category.name = name || category.name;
            if (name) category.slug = slugify(name);
            category.parentId = parentId || category.parentId;
            category.image = image || category.image;

            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            await category.deleteOne();
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };
