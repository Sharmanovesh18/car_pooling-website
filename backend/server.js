import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import localRides from "./src/data/localRides.js";
import Ride from "./src/models/Ride.js";
import Booking from "./src/models/Booking.js";
import Users from "./src/models/Users.js"; // This is the updated import

import rideRoutes from "./src/routes/rideRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import Location from "./src/models/Location.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// DB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// Initial data seeding function
const seedData = async () => {
  try {
    await Ride.deleteMany({});
    await Booking.deleteMany({});
    await Users.deleteMany({}); // Changed to Users
    await Ride.insertMany(localRides);
    console.log("✅ Database seeded with initial data.");

    // Create a sample user for testing
    const sampleUserEmail = "johndoe@example.com";
    const sampleUserPassword = "password123";

    // Hash the password for the sample user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sampleUserPassword, salt);

    // Create a new sample user with all required fields
    const sampleUser = new Users({ // Changed to Users
        _id: "66d30d3ad4b0c9241c9d4a11",
        name: "John Doe",
        email: sampleUserEmail,
        phone: "123-456-7890",
        password: hashedPassword,
    });

    await sampleUser.save();
    console.log("✅ Sample user created.");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  }
};

// User registration route
app.post("/api/auth/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExists = await Users.findOne({ email }); // Changed to Users
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new Users({ // Changed to Users
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// User login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email }); // Changed to Users
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware to protect routes (optional but recommended)
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Protected route to get user profile
app.get("/api/auth/profile", protect, async (req, res) => {
  try {
    const user = await Users.findById(req.user).select("-password"); // Changed to Users
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Search route
app.get("/api/rides/search", async (req, res) => {
  const { source, destination, date } = req.query;

  const now = new Date();
  const searchDate = date ? new Date(date) : null;

  // Check if date is in the past
  if (searchDate && searchDate < now.setHours(0, 0, 0, 0)) {
    return res.status(200).json({
      results: [],
      message: "Cannot search for past dates.",
    });
  }

  try {
    const localMatches = localRides.filter((ride) => {
      const isMatch =
        ride.source.toLowerCase() === source.toLowerCase() &&
        ride.destination.toLowerCase() === destination.toLowerCase() &&
        (ride.date === date || !date);
      return isMatch;
    });

    if (localMatches.length > 0) {
      return res.status(200).json({ results: localMatches });
    }

    const query = {
      source: { $regex: new RegExp(`^${source}$`, "i") },
      destination: { $regex: new RegExp(`^${destination}$`, "i") },
    };
    if (date) {
      query.date = date;
    }

    const dbRides = await Ride.find(query);

    if (dbRides.length > 0) {
      return res.status(200).json({ results: dbRides });
    }

    res.status(200).json({ results: [], message: "No rides found." });
  } catch (err) {
    console.error("❌ Error searching for rides:", err);
    res.status(500).json({ error: "Failed to search for rides" });
  }
});

// Book route
app.post("/api/rides/book", async (req, res) => {
  const { rideId, userId } = req.body;
  try {
    const ride = await Ride.findById(rideId);
    const user = await Users.findById(userId); // Changed to Users

    if (!ride) {
      return res.status(404).send("Ride not found.");
    }

    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (ride.remainingSeats <= 0) {
      return res.status(400).send("No seats available for this ride.");
    }

    ride.remainingSeats -= 1;
    await ride.save();

    const booking = new Booking({
      userId,
      rideId,
      source: ride.source,
      destination: ride.destination,
      fare: ride.fare,
      driver: {
        name: ride.driver.name,
        rating: ride.driver.rating,
      },
    });
    await booking.save();

    res.status(200).json({
      message: "Ride booked successfully",
      booking,
      ride: {
        source: ride.source,
        destination: ride.destination,
        fare: ride.fare,
        driver: ride.driver,
        remainingSeats: ride.remainingSeats,
      },
    });
  } catch (err) {
    console.error("❌ Error booking ride:", err);
    res.status(500).send("Failed to book ride: " + err.message);
  }
});

// Other API Routes
app.use("/api/rides", rideRoutes);
app.use("/api", bookingRoutes);

// Socket.io for live location
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);
  // Add your socket handlers here
  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  seedData();
});