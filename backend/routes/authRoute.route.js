import express from "express"; // Import express
import User from "../models/User.js"; // Import the user model
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation

const router = express.Router(); // Create a new router instance

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  }); // Generate a token with the user ID and secret
};

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body; //

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" }); // Check if all fields are filled
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" }); // Check if password is at least 6 characters
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long" }); // Check if username is at least 6 characters
    }
    // Check if email is valid
    const existingEmail = await User.findOne({ email }); // Check if email already exists
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if username is valid
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Get a random avatar from the API
    const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`; // Generate a random avatar URL

    const user = new User({
      username,
      email,
      password,
      profileImage,
    }); // Create a new user instance

    await user.save(); // Save the user to the database

    const token = generateToken(user._id); // Generate a token for the user

    res.status(201).json({
      token, // Send the token in the response
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    }); // Send the user data and token in the response
  } catch (error) {
    console.log("Error in register route:", error); // Log the error"")
    res.status(500).json({ message: "Internal Server error" }); // Send a server error response
  }
});
router.post("/login", async (req, res) => {
  res.send("login");
});

export default router;
