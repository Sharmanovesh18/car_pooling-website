import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashBoard.css";

const DashBoard = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  // const userId = "user123"; // Placeholder user ID
  
  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/rides", {
        params: {
          source: start,
          destination,
          date,
          time
        }
      });
      setRides(res.data);
    } catch (err) {
      console.error("Axios error:", err);
      setRides([]);
    }
    setLoading(false);
  };

  const handleBook = async (rideId) => {
  try {
    const res = await axios.post("http://localhost:5000/api/rides/book", {
      userId: "66d30d3ad4b0c9241c9d4a11", // your logged in user id
      start,
      destination,
      date,
      time,
      fare: 299,
      driverName: "Auto-Assigned",
      vehicleType: "Sedan"
    });
    console.log("Booked:", res.data);
    window.alert("🎉 Your ride has been successfully booked!");
    setHistory(prev => [...prev, res.data.data]);
  } catch (err) {
    console.error("Booking failed:", err.response?.data || err.message);
  }
};

  const fetchHistory = async () => {
  const userId = "66d30d3ad4b0c9241c9d4a11"; // hardcoded or from auth
  const res = await axios.get(`http://localhost:5000/api/bookings/${userId}`);
  setHistory(res.data.data);
};


  return (
    <div>
      <div className="dashboard-content">
        <div className="dashboard-form-controls">
          <input
            type="text"
            placeholder="Search starts location..."
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <span
            className="swap-icon"
            onClick={() => {
              setStart(destination);
              setDestination(start);
            }}
          >
            🔄
          </span>
          <input
            type="text"
            placeholder="Search destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {/* Ride Details Section */}
        <div className="ride-details">
          <h2>Ride Details</h2>
          {loading ? (
            <div>Loading...</div>
          ) : rides.length === 0 ? (
            <div>No rides found.</div>
          ) : (
            rides.map((ride, idx) => (
              <div className="ride-card" key={ride._id}>
                {/* ...existing ride card layout... */}
                <div className="ride-top-row">
                  <div className="ride-times">
                    <span className="ride-time-main">{ride.startTime}</span>
                    <span className="ride-duration">
                      <span className="ride-line"></span>
                      {ride.duration}
                      <span className="ride-line"></span>
                    </span>
                    <span className="ride-time-main">{ride.endTime}</span>
                  </div>
                  <div className="ride-fare">{ride.fare}</div>
                </div>
                <div className="ride-card" key={ride._id}>
                  <span className="ride-location">{ride.source}</span>
                  <span className="ride-location">{ride.destination}</span>
                </div>
                <div className="ride-info-row">
                  <span className="car-icon">🚗</span>
                  <span className="driver-avatar">
                    {ride.driverImg ? (
                      <img src={ride.driverImg} alt={ride.driver} />
                    ) : (
                      <span className="avatar-blank"></span>
                    )}
                  </span>
                  <span className="driver-name">{ride.driver}</span>
                  {ride.rating && (
                    <span className="driver-rating">★ {ride.rating}</span>
                  )}
                  <span className="booking-type"> ⚡ {ride.bookingType}</span>
                  <button
                    disabled={ride.booked}
                    onClick={() => handleBook(ride._id)}
                  >
                    {ride.booked ? "Booked" : "Book"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="dashboard-main-layout">
          <div className="dashboard-sidebar">
            <h3>Filters</h3>
            {/* Add filter options here */}
          </div>
          <div className="dashboard-rides">
            <h3>Your Rides</h3>
            {/* Display user's rides here */}
          </div>
        </div>
      </div>
      <button className="history-btn" onClick={() => setHistoryOpen(true)}>
        Show History
      </button>
      {historyOpen && (
        <div className="history-modal">
          <div className="history-content">
            <button
              className="close-btn"
              onClick={() => setHistoryOpen(false)}
            >
              &times;
            </button>
            <h3>Booking History</h3>
            {history.length === 0 ? (
              <div>No previous bookings.</div>
            ) : (
              history.map((ride, idx) => (
                <div className="history-card" key={idx}>
                  <div>
                    <b>From:</b> {ride.source}
                  </div>
                  <div>
                    <b>To:</b> {ride.destination}
                  </div>
                  <div>
                    <b>Price:</b> {ride.fare}
                  </div>
                  <div>
                    <b>Driver:</b> {ride.driver}
                  </div>
                  <div><b>Date:</b> {ride.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
