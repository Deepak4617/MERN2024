const mongoose = require("mongoose");

const URI = process.env.MONGODB_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 20000,
    });

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDb;
