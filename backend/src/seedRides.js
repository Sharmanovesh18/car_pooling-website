import mongoose from "mongoose";
import Ride from "../models/Ride.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cab_booking";

const today = new Date().toISOString().slice(0, 10);
const rides = [
  {
    source: "Chandigarh",
    destination: "Mohali",
    date: today,
    time: "10:00",
    fare: 250,
    driver: "Amit",
    vehicleType: "Sedan"
  },
  {
    source: "Gumthala",
    destination: "Chandigarh",
    date: today,
    time: "12:00",
    fare: 300,
    driver: "Bharat",
    vehicleType: "SUV"
  },
  {
    source: "Chandi",
    destination: "Chandi",
    date: today,
    time: "14:00",
    fare: 200,
    driver: "Kasturi Lal",
    vehicleType: "Hatchback"
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Ride.deleteMany({});
  await Ride.insertMany(rides);
  console.log("✅ Sample rides seeded");
  mongoose.disconnect();
}

seed();
