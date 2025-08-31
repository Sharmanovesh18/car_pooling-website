// src/seed.js
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { Ride } from "./models/Ride.js";

await connectDB();
await Ride.deleteMany();

await Ride.insertMany([
  {
    source: "Kolkata",
    destination: "Howrah",
    startTime: "10:00",
    endTime: "10:30",
    duration: "30 min",
    fare: 200,
    driver: "Rohit",
    rating: 4.5,
    bookingType: "Instant"
  },
  {
    source: "Kolkata",
    destination: "Airport",
    startTime: "11:00",
    endTime: "12:00",
    duration: "1 hr",
    fare: 500,
    driver: "Amit",
    rating: 4.8,
    bookingType: "Scheduled"
  }
]);

console.log("✅ Rides seeded");
process.exit();
