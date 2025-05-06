import express from "express"; // Import express
import "dotenv/config.js"; // Import environment variables

import authRoutes from "../routes/authRoute.route.js"; // Import the auth routes
import { connectDB } from "./lib/db.js"; // Import the database connection function

const app = express(); // Create an instance of express
const PORT = process.env.PORT || 3000; // Set the port to the value in the environment variable or default to 3000

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/auth", authRoutes); // Mount the auth routes under /api/auth

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Start the server
  connectDB(); // Connect to the database
});
