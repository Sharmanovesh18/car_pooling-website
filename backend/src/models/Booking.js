// import mongoose from "mongoose";

// const passengerSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   name: String
// }, { _id: false });

// const bookingSchema = new mongoose.Schema({
//   rideId: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
//   driver: {
//     name: String,
//     phone: String,
//     rating: Number
//   },
//   start: String,
//   destination: String,
//   date: String,
//   time: String,
//   fare: Number,
//   paymentMethod: String,
//   passengers: [passengerSchema], // first is the rider who booked
//   createdAt: { type: Date, default: Date.now },
//   status: { type: String, default: "confirmed" } // e.g., confirmed, cancelled
// });

// export default mongoose.model("Booking", bookingSchema);




import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  rideId: { type: String, required: true },
  userId: { type: String, required: true },
  bookedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
