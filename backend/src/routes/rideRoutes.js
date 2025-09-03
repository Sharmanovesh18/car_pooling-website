import express from "express";
import { searchRides, bookRide } from "../controllers/rideController.js";

const router = express.Router();

// GET /api/rides/search
router.get("/search", searchRides);

// POST /api/rides/book
router.post("/book", bookRide);

export default router;
