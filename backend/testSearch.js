import mongoose from "mongoose";
import Ride from "./src/models/Ride.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cab_booking";

async function testSearch() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check all rides in database
    const allRides = await Ride.find({});
    console.log(`📊 Total rides in database: ${allRides.length}`);
    
    allRides.forEach((ride, index) => {
      console.log(`${index + 1}. ${ride.source} → ${ride.destination} (₹${ride.fare}) - ${ride.driver.name} - Available: ${ride.availableSeats} seats`);
    });

    // Test specific search
    console.log("\n🔍 Testing search: Mumbai → Pune");
    const mumbaiToPune = await Ride.find({
      source: { $regex: "Mumbai", $options: 'i' },
      destination: { $regex: "Pune", $options: 'i' }
    });
    
    console.log(`Found ${mumbaiToPune.length} rides from Mumbai to Pune:`);
    mumbaiToPune.forEach(ride => {
      console.log(`  - Driver: ${ride.driver.name}, Fare: ₹${ride.fare}, Available: ${ride.availableSeats} seats`);
    });

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Test failed:", error);
    mongoose.disconnect();
  }
}

testSearch();