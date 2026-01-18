const mongoose = require('mongoose');
// const URI = 'mongodb+srv://hacker123:mern123@mernproject.9o3saxr.mongodb.net/?retryWrites=true&w=majority&appName=mernProject';


const URI = process.env.MONGODB_URL;
const connectDb = async () => {
    try {
        await mongoose.connect(URI)
        serverSelectionTimeoutMS: 20000,
        console.log('Connection successfull to db')
    } catch (error) {
        console.error('Database connection is failed')
        // process.exist(0);

    }

}

module.exports = connectDb;