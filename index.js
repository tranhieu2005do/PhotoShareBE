const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const connectDB = require("./modelData/connectDB");

const User = require("./modelData/User");
const Photo = require("./modelData/Photo");

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

app.use("/images", express.static(path.join(__dirname, "images")));
const JWT_SECRET = "photo-sharing-secret";
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

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

// LOGIN
app.post("/admin/login", async (req, res) => {
  try {
    console.log("LOGIN/");
    const { loginName, password } = req.body;
    const user = await User.findOne({ login_name: loginName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password != password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // GENERATE TOKEN
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT
app.post("/admin/logout", (req, res) => {
  res.status(200).json({
    message: "Logout successfully",
  });
});

// GET PHOTOS OF USER
app.get("/photosOfUser/:id", async (req, res) => {
  try {
    const photos = await Photo.find({
      user_id: req.params.id,
    }).populate("comments.user_id", "_id first_name last_name");

    const baseUrl = `https://cckzwq-5000.csb.app/images/`;

    const photosWithUrls = photos.map((photo) => ({
      ...photo._doc,
      file_name: baseUrl + photo.file_name,
    }));

    res.status(200).json(photosWithUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/commentsOfPhoto/:photo_id", requireAuth, async (req, res) => {
  try {
    const { photo_id } = req.params;
    const { comment } = req.body;

    const photo = await Photo.findById(photo_id);

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found",
      });
    }
    if (!comment.trim()) {
      return res.status(400).json({ message: "Comment can not be empty" });
    }

    photo.comments.push({
      comment,
      user_id: req.user._id,
      date_time: new Date(),
    });

    await photo.save();

    const updatedPhoto = await Photo.findById(photo_id).populate(
      "comments.user_id",
      "_id first_name last_name"
    );

    return res.status(200).json({
      message: "Comment added successfully",
      photo: updatedPhoto,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

app.post(
  "/photos/new",
  requireAuth,
  upload.single("photo"),
  async (req, res) => {
    try {
      console.log("PHOTO NEW");
      if (!req.file) {
        return res.status(400).json({
          message: "Photo file is required",
        });
      }

      const photo = await Photo.create({
        file_name: req.file.filename,
        date_time: new Date(),
        user_id: req.user._id,
        comments: [],
      });

      return res.status(200).json({
        message: "Photo uploaded successfully",
        data: photo,
      });
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        message: "Server error",
      });
    }
  }
);

//REGISTER
app.post("/user/register", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      location,
      description,
      occupation,
      login_name,
      password,
    } = req.body;

    const existed = await User.findOne({
      login_name,
    });

    if (existed) {
      return res.status(400).json({
        message: "Login name already exists",
      });
    }

    const user = await User.create({
      first_name,
      last_name,
      location,
      description,
      occupation,
      login_name,
      password,
    });

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
