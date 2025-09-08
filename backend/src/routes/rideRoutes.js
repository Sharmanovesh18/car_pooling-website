import express from "express";
import { searchRides, bookRide, createRide } from "../controllers/rideController.js";

const router = express.Router();

// GET /api/rides/search
router.get("/search", searchRides);

// POST /api/rides/book
router.post("/book", async (req, res, next) => {
	// If only driver, source, destination, date, time are provided, create a new ride
	if (req.body && (!req.body.rideId && req.body.source && req.body.destination)) {
		return createRide(req, res, next);
	}
	// Otherwise, book an existing ride
	return bookRide(req, res, next);
});

export default router;
