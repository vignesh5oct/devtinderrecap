const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Database connection function
// This function connects to a MongoDB database using Mongoose.
console.log(`MongoDB URI: ${process.env.MONGODB_URL}`);

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

module.exports = connectDB;

