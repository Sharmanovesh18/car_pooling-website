import express from "express";

const router = express.Router();

// 🔹 Dummy ride data
let rides = [
  {
    _id: "1",
    source: "Kolkata",
    destination: "Howrah",
    date: "2025-09-02",
    time: "10:00",
    fare: 299,
    driver: "Ramesh",
    driverImg: "",
    rating: 4.5,
    bookingType: "Instant",
    booked: false,
    startTime: "10:00",
    endTime: "10:30",
    duration: "30 mins",
  },
  {
    _id: "2",
    source: "Kolkata",
    destination: "Delhi",
    date: "2025-09-02",
    time: "12:00",
    fare: 1299,
    driver: "Suresh",
    driverImg: "",
    rating: 4.8,
    bookingType: "Scheduled",
    booked: false,
    startTime: "12:00",
    endTime: "15:00",
    duration: "3 hrs",
  },
];

let bookings = []; // store user bookings

// 🔹 GET /api/rides (search rides)
router.get("/", (req, res) => {
  const { source, destination, date } = req.query;
  let results = rides.filter(
    (ride) =>
      ride.source.toLowerCase() === source.toLowerCase() &&
      ride.destination.toLowerCase() === destination.toLowerCase() &&
      ride.date === date
  );
  res.json(results);
});

// 🔹 POST /api/rides/book
router.post("/book", (req, res) => {
  const { userId, start, destination, date, time, fare, driverName, vehicleType } = req.body;

  const booking = {
    bookingId: Date.now().toString(),
    userId,
    source: start,
    destination,
    date,
    time,
    fare,
    driver: driverName,
    vehicleType,
  };

  bookings.push(booking);

  res.json({ message: "Ride booked successfully", data: booking });
});

// 🔹 GET /api/bookings/:userId
router.get("/bookings/:userId", (req, res) => {
  const { userId } = req.params;
  const userBookings = bookings.filter((b) => b.userId === userId);
  res.json({ data: userBookings });
});

export default router;
