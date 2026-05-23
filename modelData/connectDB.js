const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://simple_blog:123@cluster0.64gp8id.mongodb.net/PhotoSharing?appName=Cluster0";
const connectDB = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Ye Connected to MongoDB Atlas"))
    .catch((err) => console.error(" MongoDB connection error:", err));
};

module.exports = connectDB;
