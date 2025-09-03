import mongoose from "mongoose";

const searchLogSchema = new mongoose.Schema({
  query: {
    source: String,
    destination: String,
    date: String,
    time: String
  },
  resultsCount: Number,
  // store placeholder driver/passenger(s) snapshot for analytics or quick revisit
  drivers: [Object],
  passengers: [Object],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SearchLog", searchLogSchema);
