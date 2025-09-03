import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./src/models/User.js";
import Ride from "./src/models/Ride.js";

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cab_booking", { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  await User.deleteMany({});
  await Ride.deleteMany({});

  const users = await User.create([
    { name: "Partha Dey", phone: "9000000000", email: "partha@example.com" },
    { name: "Anjali Roy", phone: "9000000001", email: "anjali@example.com" }
  ]);

  const rides = [
    {
      driver: "Ravi Kumar",
      vehicleType: "Swift Dzire",
      rating: 4.9,
      source: "Salt Lake Sector V",
      destination: "New Town",
      date: "2025-09-05",
      time: "09:00",
      fare: 200,
      bookingType: "Instant",
      booked: false
    },
    {
      driver: "Sunil P.",
      vehicleType: "Baleno",
      rating: 4.8,
      source: "Howrah",
      destination: "Park Street",
      date: "2025-09-05",
      time: "18:30",
      fare: 250,
      bookingType: "Instant",
      booked: false
    },
    {
      driver: "Priya S.",
      vehicleType: "Honda City",
      rating: 4.7,
      source: "Dum Dum",
      destination: "Esplanade",
      date: "2025-09-05",
      time: "12:00",
      fare: 300,
      bookingType: "Instant",
      booked: false
    },
    {
      driver: "Anjali Roy",
      vehicleType: "Toyota Innova",
      rating: 4.6,
      source: "Rajpura",
      destination: "Ambala",
      date: "2025-09-05",
      time: "15:00",
      fare: 350,
      bookingType: "Instant",
      booked: false
    },
    {
      driver: "Rahul Sharma",
      vehicleType: "Mahindra XUV500",
      rating: 4.5,
      source: "Pune",
      destination: "Mumbai",
      date: "2025-09-05",
      time: "10:00",
      fare: 400,
      bookingType: "Instant",
      booked: false
    }
  ];

  await Ride.create(rides);
  console.log("Seeded users and rides");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
