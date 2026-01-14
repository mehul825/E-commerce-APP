const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional, but usually in MERN specific tutorials
const users = require('./data/users');
const products = require('./data/products');
const categories = require('./data/categories');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Category = require('./models/categoryModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const createdCategories = await Category.insertMany(categories);

        // Helper to find category ID by name (since we used names in product data for readability)
        const getCategoryId = (name) => {
            const cat = createdCategories.find(c => c.name === name);
            return cat ? cat._id : createdCategories[0]._id; // Fallback to first category
        };

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser,
                category: getCategoryId(product.category)
            };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
