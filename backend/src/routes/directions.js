import { Router } from "express";
import { Client } from "@googlemaps/google-maps-services-js";

const router = Router();
const client = new Client({});
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// POST /api/directions
router.post("/", async (req, res) => {
  try {
    const { origin, destination, travelMode = "DRIVING" } = req.body;
    if (!origin || !destination) {
      return res.status(400).json({ error: "origin and destination required" });
    }

    const resp = await client.directions({
      params: {
        origin,
        destination,
        mode: travelMode.toLowerCase(),
        key: API_KEY,
      },
    });

    res.json(resp.data);
    console.log(resp.data);
  } catch (err) {
    console.error("❌ Directions error:", err.response?.data || err.message);
    res.status(500).json({
      error: "directions error",
      details: err.response?.data || err.message,
    });
  }
});

export default router;
