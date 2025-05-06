import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

// hash password before saving user to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // Check if the password is modified
    return next(); // If not modified, skip hashing
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10); // Generate a salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Call the next middleware
});

const User = mongoose.model("User", userSchema); // Create a User model based on the schema

export default User;
