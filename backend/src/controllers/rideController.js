import Ride from "../models/Ride.js";
import SearchLog from "../models/SearchLog.js";

/**
 * Local fare table for five fixed distance buckets (km)
 */
const DISTANCES = [2, 5, 10, 20, 50];
const FARE_TABLE = [50, 120, 240, 420, 1000];

function distanceIndexForPair(source = "", destination = "") {
  const s = (source + "|" + destination).toLowerCase();
  let acc = 0;
  for (let i = 0; i < s.length; i++) acc = (acc * 31 + s.charCodeAt(i)) >>> 0;
  return acc % DISTANCES.length;
}

function computeFare(source, destination) {
  const idx = distanceIndexForPair(source, destination);
  return {
    distanceKm: DISTANCES[idx],
    fare: FARE_TABLE[idx]
  };
}

// 🔍 Search rides
export const searchRides = async (req, res) => {
  try {
    const { source, destination, date, time } = req.query;
    if (!source || !destination) {
      return res.status(400).json({ error: "source and destination required" });
    }

    const rides = await Ride.find({
      source: new RegExp(source, "i"),
      destination: new RegExp(destination, "i"),
      date: date ? date : { $exists: true }
    }).limit(20);

    let results = [];
    if (rides.length === 0) {
      const sampleDrivers = [
        { name: "Ravi Kumar", rating: 4.9, vehicle: "Swift Dzire", phone: "999900001" },
        { name: "Anita S.", rating: 4.7, vehicle: "Etios", phone: "999900002" },
        { name: "Sunil P.", rating: 4.8, vehicle: "Baleno", phone: "999900003" }
      ];
      results = sampleDrivers.map((d) => {
        const { distanceKm, fare } = computeFare(source, destination);
        return {
          driver: d,
          start: source,
          destination,
          date,
          time,
          distanceKm,
          fare
        };
      });
    } else {
      results = rides.map((r) => {
        const { distanceKm, fare } = computeFare(r.source, r.destination);
        return {
          driver: r.driver,
          start: r.source,
          destination: r.destination,
          date: r.date,
          time: r.time,
          distanceKm,
          fare
        };
      });
    }

    const log = await SearchLog.create({
      query: { source, destination, date, time },
      resultsCount: results.length,
      drivers: results.map((r) => r.driver),
      passengers: []
    });

    return res.json({ searchId: log._id, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};

// 🧾 Book ride
export const bookRide = async (req, res) => {
  try {
    const { rideId, userId } = req.body;

    if (!rideId || !userId) {
      return res.status(400).json({ error: "rideId and userId are required" });
    }

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    // Optional: update ride with passenger info or booking status
    ride.passengers = ride.passengers || [];
    ride.passengers.push(userId);
    await ride.save();

    return res.status(200).json({ message: "Ride booked successfully", rideId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed due to server error" });
  }
};
