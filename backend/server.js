import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";


import rideRoutes from "./src/routes/rideRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import authRoutes from "./src/routes/auth.js";
import directionsRouter from "./src/routes/directions.js";
import driverRoutes from "./src/routes/driverRoutes.js";
import Location from "./src/models/Location.js";  // ✅ add this if you have a Location model

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// ✅ DB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// ✅ API Routes
app.use("/api/rides", rideRoutes);
app.use("/api", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/directions", directionsRouter);
app.use("/api/drivers", driverRoutes);

// ✅ Socket.io for live location
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("auth", (data) => {
    socket.data.userId = data?.userId || socket.id;
    socket.join(socket.data.userId);
    console.log(`User authenticated: ${socket.data.userId}`);
  });

  socket.on("myLocation", async (loc) => {
    const userId = socket.data.userId || socket.id;
    try {
      await Location.findOneAndUpdate(
        { userId },
        { userId, coords: loc, updatedAt: new Date() },
        { upsert: true }
      );
      socket.emit("locationSaved", { ok: true, at: Date.now() });
    } catch (err) {
      console.error("❌ Location save error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
