const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./modelData/connectDB");

const User = require("./modelData/User");
const Photo = require("./modelData/Photo");

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

// GET USER LIST
app.get("/user/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET USER DETAIL
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET PHOTOS OF USER
app.get("/photosOfUser/:id", async (req, res) => {
  try {
    const photos = await Photo.find({
      user_id: req.params.id,
    }).populate("comments.user_id", "_id first_name last_name");

    const baseUrl = `http://localhost:${PORT}/images/`;

    const photosWithUrls = photos.map((photo) => ({
      ...photo._doc,
      file_name: baseUrl + photo.file_name,
    }));

    res.status(200).json(photosWithUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
