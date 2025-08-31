import express from "express";
import cors from "cors";
import rideRoutes from "./routes/rideRoutes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// mount routes
app.use("/api/rides", rideRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
