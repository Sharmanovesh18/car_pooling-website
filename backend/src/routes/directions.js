import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Helper: Check if a string is in "lng,lat" format
const isCoordinate = (str) => {
  const parts = str.split(",");
  return parts.length === 2 && !isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1]));
};

// Geocode address to [lng, lat] using Google Maps
const geocodeAddress = async (address) => {
  try {
    const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: { address, key: process.env.GOOGLE_MAPS_API_KEY }
    });
    if (!res.data.results || res.data.results.length === 0) return null;
    const loc = res.data.results[0].geometry.location;
    return [loc.lng, loc.lat]; // Google returns lat/lng
  } catch (err) {
    console.error("🧭 Geocoding failed:", err.message);
    return null;
  }
};

// GET /api/route?start=lng,lat_or_address&end=lng,lat_or_address&profile=driving-car
router.get("/api/route", async (req, res) => {
  try {
    let { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: "Both 'start' and 'end' parameters are required." });
    }

    // Geocode start if needed
    if (!isCoordinate(start)) {
      const geocodedStart = await geocodeAddress(start);
      if (!geocodedStart) {
        return res.status(400).json({ error: `Could not geocode start location: ${start}` });
      }
      start = geocodedStart.join(",");
    }

    // Geocode end if needed
    if (!isCoordinate(end)) {
      const geocodedEnd = await geocodeAddress(end);
      if (!geocodedEnd) {
        return res.status(400).json({ error: `Could not geocode end location: ${end}` });
      }
      end = geocodedEnd.join(",");
    }

    // Call Google Directions API
    const resDirections = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
      params: {
        origin: start,
        destination: end,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });
    res.json(resDirections.data);
  } catch (err) {
    console.error("🚨 Route fetch error:", err?.response?.data || err.message);
    res.status(500).json({
      error: "Failed to fetch route",
      detail: err?.response?.data || err.message
    });
  }
});

export default router;
