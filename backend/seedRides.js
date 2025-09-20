import mongoose from "mongoose";
import dotenv from "dotenv";
import Ride from "./src/models/Ride.js";

dotenv.config();

const rides = [
  {
    driver: { name: "Amit Sharma", phone: "9876543210", carModel: "Honda City", carNumber: "WB12AB1234", area: "Salt Lake", rating: 4.9 },
    source: "Salt Lake",
    destination: "Howrah",
    date: "2025-09-22",
    time: "10:00",
    availableSeats: 3
  },
  {
    driver: { name: "Priya Sen", phone: "9876543211", carModel: "Hyundai i20", carNumber: "WB12CD5678", area: "Dumdum", rating: 4.8 },
    source: "Rajpura",
    destination: "Chandigarh",
    date: "2025-09-22",
    time: "11:00",
    availableSeats: 2
  },
  {
    driver: { name: "Rahul Das", phone: "9876543212", carModel: "Maruti Swift", carNumber: "WB12EF9012", area: "Howrah", rating: 4.7 },
    source: "Howrah",
    destination: "Salt Lake",
    date: "2025-09-22",
    time: "12:00",
    availableSeats: 4
  },
  {
    driver: { name: "Sunita Roy", phone: "9876543213", carModel: "Tata Nexon", carNumber: "WB12GH3456", area: "Garia", rating: 4.9 },
    source: "Garia",
    destination: "Esplanade",
    date: "2025-09-22",
    time: "13:00",
    availableSeats: 3
  },
  {
    driver: { name: "Sourav Pal", phone: "9876543214", carModel: "Toyota Etios", carNumber: "WB12IJ7890", area: "Behala", rating: 4.8 },
    source: "Rajpura",
    destination: "Chandigarh",
    date: "2025-09-22",
    time: "14:00",
    availableSeats: 2
  },
  {
    driver: { name: "Anjali Gupta", phone: "9876543215", carModel: "Honda Amaze", carNumber: "WB12KL3456", area: "Ballygunge", rating: 4.7 },
    source: "Ballygunge",
    destination: "Salt Lake",
    date: "2025-09-22",
    time: "15:00",
    availableSeats: 3
  },
  {
    driver: { name: "Vikram Singh", phone: "9876543216", carModel: "Ford Figo", carNumber: "WB12MN7890", area: "Esplanade", rating: 4.6 },
    source: "Esplanade",
    destination: "Garia",
    date: "2025-09-22",
    time: "16:00",
    availableSeats: 4
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Ride.deleteMany({});
  await Ride.insertMany(rides);
  console.log("Seeded rides successfully!");
  await mongoose.disconnect();
}

seed();
