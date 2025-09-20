import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashBoard.css";

const TimedRideCard = ({ ride, onBook, onShare, bookingRideId, bookingLoading }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 20000); // hide after 20 sec
    return () => clearTimeout(timer);
  }, []);


  if (!visible) return null;

  return (
    <div className="ride-card">
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
      <div className="ride-card">
        <span className="ride-location">{ride.source}</span>
        <span className="ride-location">{ride.destination}</span>
      </div>
      <div className="ride-info-row">
        <span className="car-icon">🚗</span>
        <span className="driver-avatar">
          {ride.driverImg ? (
             <img src={ride.driverImg} alt={typeof ride.driver === "object" ? ride.driver.name : ride.driver} />
          ) : (
            <span className="avatar-blank"></span>
          )}
        </span>
        <span className="driver-name">
          {typeof ride.driver === "object" ? ride.driver.name : ride.driver}
        </span>
        {ride.rating && <span className="driver-rating">★ {ride.rating}</span>}
        <span className="booking-type">⚡ {ride.bookingType}</span>
        <button
          onClick={() => onBook(ride._id)} disabled={!onBook}
        >
          Book
        </button>

        {/* ✅ Agree to share button */}
        {ride._id && ride.stops?.includes(ride.destination) && (
          <button onClick={() => onShare(ride._id)}>Agree</button>
        )}

      </div>
    </div>
  );
};


const DashBoard = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [rides, setRides] = useState([]);
  const [visibleRides, setVisibleRides] = useState([]); // ✅ new state
  const [loading, setLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [shareOpen, setShareOpen] = useState(false);
  const [sharedRide, setSharedRide] = useState(null);
  const [bookingPopup, setBookingPopup] = useState(null); // ✅ new state
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingRideId, setBookingRideId] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/rides/search", {
        params: {
          source: start,
          destination,
          date,
          time,
        },
      });
      setRides(res.data.results); // <-- Fix here
    } catch (err) {
      console.error("Axios error:", err);
      setRides([]);
    }
    setLoading(false);
  };

  // Show all matching rides at once
  useEffect(() => {
    setVisibleRides(rides);
  }, [rides]);

  const handleBook = async (rideId) => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rideId, userId: "12345" }) // userId must come from login/session
      });

      if (!response.ok) {
        const text = await response.text();
        alert("Booking failed: " + text);
        return;
      }

      const data = await response.json();
      alert("Ride booked successfully!");
    } catch (err) {
      console.error("Error booking:", err);
      alert("Booking failed: " + err.message);
    }
  };



  const bookingHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId });
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch booking history" });
  }
};



  // ✅ Handle Agree (Share Ride)
  const handleShare = async (bookingId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/bookings/${bookingId}/share`,
        { userId: "66d30d3ad4b0c9241c9d4a11" }
      );
      setSharedRide(res.data.data);
      setShareOpen(true);
    } catch (err) {
      console.error("Share ride failed:", err.response?.data || err.message);
    }
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
          ) : visibleRides.length === 0 ? (
            <div>No rides found.</div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              {visibleRides.slice(0, 3).map((ride) => (
                <div style={{ flex: '0 1 300px', minWidth: 260, maxWidth: 340 }} key={ride._id || ride.driver?.name+ride.start+ride.destination}>
                  <TimedRideCard
                    ride={ride}
                    onBook={handleBook}
                    onShare={handleShare}
                    bookingRideId={bookingRideId}
                    bookingLoading={bookingLoading}
                  />
                </div>
              ))}
            </div>
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

      <div className="history-button-container" style={{ textAlign: 'center', margin: '16px 0' }}>
        <button className="history-btn" onClick={() => setHistoryOpen(true)}>
          Show History
        </button>
      </div>

      {historyOpen && (
        <div className="history-modal">
          <div className="history-content">
            <button className="close-btn" onClick={() => setHistoryOpen(false)}>
              &times;
            </button>
            <h3>Booking History</h3>
            {history.length === 0 ? (
              <div>No previous bookings.</div>
            ) : (
              history.map((ride, idx) => (
                <div className="history-card" key={ride._id || idx}>
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
                    <b>Driver:</b>{" "}
                    {typeof ride.driver === "object"
                      ? ride.driver.name
                      : ride.driver}
                  </div>
                  <div>
                    <b>Date:</b> {ride.date}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ✅ Shared Ride Modal */}
      {shareOpen && sharedRide && (
        <div className="share-modal">
          <div className="share-content">
            <button className="close-btn" onClick={() => setShareOpen(false)}>
              &times;
            </button>
            <h3>Shared Ride</h3>
            <div className="share-layout">
              <div className="driver-side">
                <h4>Driver</h4>
                <p>{sharedRide.driver}</p>
                <p>📞 {sharedRide.driverPhone}</p>
                <p>⭐ {sharedRide.rating}</p>
              </div>
              <div className="passenger-side">
                <h4>Co-Passengers</h4>
                {sharedRide.passengers?.length === 0 ? (
                  <p>No co-passengers yet</p>
                ) : (
                  sharedRide.passengers.map((p, idx) => (
                    <p key={p._id || p.name || idx}>Passenger {idx + 1}</p>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Booking Confirmation Popup */}
      {bookingPopup && (
        <div className="popup-modal">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setBookingPopup(null)}>
              &times;
            </button>
            <h3>🎉 Ride Booked Successfully!</h3>
            <div><b>From:</b> {bookingPopup.start}</div>
            <div><b>To:</b> {bookingPopup.destination}</div>
            <div><b>Date:</b> {bookingPopup.date}</div>
            <div><b>Time:</b> {bookingPopup.time}</div>
            <div><b>Fare:</b> {bookingPopup.fare}</div>
            <div><b>Driver:</b> {bookingPopup.driver?.name || bookingPopup.driver}</div>
            <div><b>Distance:</b> {bookingPopup.distanceKm ? `${bookingPopup.distanceKm} km` : 'N/A'}</div>
            <div><b>Passengers:</b></div>
            {bookingPopup.passengers?.length ? (
              bookingPopup.passengers.map((p, idx) => (
                <p key={p._id || p.name || idx}>{p.name || `Passenger ${idx + 1}`}</p>
              ))
            ) : (
              <p>No other passengers yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
