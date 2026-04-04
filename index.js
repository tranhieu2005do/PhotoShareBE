const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  userListModel,
  userModel,
  photoOfUserModel,
  schemaInfo,
} = require("./modelData/models");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve static images
app.use("/images", express.static(path.join(__dirname, "images")));

// API Endpoints as per Problem 2
app.get("/test/info", (req, res) => {
  try {
    const info = schemaInfo();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/list", (req, res) => {
  try {
    const users = userListModel();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/:id", (req, res) => {
  try {
    const user = userModel(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/photosOfUser/:id", (req, res) => {
  try {
    const photos = photoOfUserModel(req.params.id);
    const baseUrl = `http://localhost:${PORT}/images/`;
    const photosWithUrls = photos.map(photo => ({
      ...photo,
      file_name: baseUrl + photo.file_name
    }));
    res.status(200).json(photosWithUrls);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`BE_v1 Server is running on http://localhost:${PORT}`);
});
