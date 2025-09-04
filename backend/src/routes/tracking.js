import express from "express";
import Location from "../models/Location.js";

const router = express.Router();

// Get last location for a user (pass userId as query param for simplicity)
router.get("/last", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId required" });
  const last = await Location.findOne({ userId }).lean();
  res.json({ last });
});

export default router;
