import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bookingRoutes from "./routes/bookingRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import rideRoutes from "./routes/rideRoutes.js";

app.use("/api/rides", rideRoutes);
// CORS
const allowed = process.env.CLIENT_ORIGIN?.split(",") ?? ["http://localhost:3000"];
app.use(
  cors({
    origin: allowed,
    credentials: true
  })
);

// Logs
app.use(morgan("dev"));

// API
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/bookings", bookingRoutes);

// 404 + errors
app.use(notFound);
app.use(errorHandler);

export default app;
