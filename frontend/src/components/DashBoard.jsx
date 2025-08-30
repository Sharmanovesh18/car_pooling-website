import React, { useState } from "react";

const DashBoard = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const handleSwap = () => {
    setStart(destination);
    setDestination(start);
  };
  return (
    <div>
        <style>{`
            .dashboard-content {
            background: #f5f5f5bb;
            padding: 30px;
            border-radius: 10px;
            max-width: 80%;
            margin: 40px auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .dashboard-form-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            }
            .dashboard-content input[type="text"],
            .dashboard-content select {
            margin: 10px 0;
            padding: 10px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid #ccc;
            background: #fff;
            color: #6f6969ff;
            }
            .dashboard-content input[type="date"] {
                margin: 10px 0;
                padding: 10px;
                width: 100%;
                border-radius: 5px;
                border: 1px solid #ccc;
                background: #fff;
                min-width: 120px;
                color: #6f6969ff;
                box-shadow: 0 1px 2px rgba(0,0,0,0.08);
            }
            .dashboard-content button {
                background: #007bff;
                color: #fff;
                border: none;
                padding: 7px 15px;
                border-radius: 5px;
                cursor: pointer;
                margin: 10px;
            }
            .swap-icon {
                font-size: 1.5rem;
                margin: 0 8px;
                cursor: pointer;
                vertical-align: middle;
            }
            .dashboard-footer {
                text-align: center;
                margin-top: 40px;
                color: #888;
            }
            .upcoming-rides {
                margin-top: 40px;
                background: #f5f5f5bb;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                gap: 50px;
            }
            .filter-section {
                margin-top: 20px;
                width: 35%;
                padding: 50px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .ride-details {
              margin-top: 30px;
              text-align: center;
              align-items: center;
            }
            .ride-details h2 {
              font-size: 1.3rem;
              color: #007bff;
              margin-bottom: 18px;
            }
            .ride-card {
              background: #f8fafc;
              border-radius: 12px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.06);
              padding: 18px 24px;
              margin-bottom: 18px;
              max-width: 600px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .ride-top-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .ride-times {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .ride-time-main {
              font-size: 1.1rem;
              font-weight: bold;
              color: #222;
            }
            .ride-duration {
              display: flex;
              align-items: center;
              font-size: 0.95rem;
              color: #888;
              gap: 4px;
            }
            .ride-line {
              display: inline-block;
              width: 32px;
              height: 2px;
              background: #b0b8c1;
              border-radius: 2px;
              margin: 0 2px;
            }
            .ride-fare {
              font-size: 1.3rem;
              font-weight: bold;
              color: #007bff;
              min-width: 80px;
              text-align: right;
            }
            .ride-locations {
              display: flex;
              justify-content: space-between;
              margin-top: 2px;
              margin-bottom: 8px;
            }
            .ride-location {
              font-size: 1.1rem;
              font-weight: 500;
              color: #0a2c3d;
            }
            .ride-info-row {
              display: flex;
              align-items: center;
              gap: 14px;
              margin-top: 8px;
            }
            .car-icon {
              font-size: 1.5rem;
            }
            .driver-avatar {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              overflow: hidden;
              background: #e6e6e6;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .driver-avatar img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
            }
            .avatar-blank {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: #fff;
              border: 2px solid #b0b8c1;
            }
            .driver-name {
              font-size: 1rem;
              color: #222;
              font-weight: 500;
            }
            .driver-rating {
              font-size: 1rem;
              color: #007bff;
              font-weight: 500;
            }
            .booking-type {
              font-size: 1rem;
              color: #888;
              font-weight: 500;
            }
            .dashboard-main-layout {
              display: flex;
              width: 100%;
              gap: 32px;
              align-items: flex-start;
              margin-top: 30px;
              justify-content: center;
            }
            .sort-section {
              min-width: 260px;
              background: none;
              padding: 0 0 0 10px;
            }
            .sort-section h2 {
              font-size: 1.2rem;
              color: #0a2c3d;
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .clear-all {
              font-size: 0.95rem;
              color: #888;
              cursor: pointer;
              margin-left: 10px;
            }
            .sort-options {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
            .sort-options label {
              font-size: 1rem;
              color: #0a2c3d;
              display: flex;
              align-items: center;
              gap: 8px;
              cursor: pointer;
            }
            .sort-options input[type="radio"] {
              accent-color: #007bff;
              margin-right: 6px;
            }
            .sort-icon {
              font-size: 1.1rem;
              margin-left: 4px;
            }
            .ride-details {
              flex: 1;
              margin-top: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
        `}</style>
        <div className="dashboard-content">
            <div className="dashboard-form-controls">
            <input
                type="text"
                placeholder="Search starts location..."
                value={start}
                onChange={(e) => setStart(e.target.value)}
            />
            {/* Icons for changing my source to destination and vice versa */}
            <span className="swap-icon" onClick={handleSwap}>
                🔄
            </span>
            <input
                type="text"
                placeholder="Search destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <input type="date" placeholder="Search date..." />
            <select>
                <option value="" selected>
                Select passengers
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <button>Search</button>
            </div>
            <div className="dashboard-main-layout">
        <div className="sort-section">
          <h2>Sort by <span className="clear-all">Clear all</span></h2>
          <div className="sort-options">
            <label><input type="radio" name="sort" defaultChecked /> Earliest departure <span className="sort-icon">🕒</span></label>
            <label><input type="radio" name="sort" /> Lowest price <span className="sort-icon">🪙</span></label>
            <label><input type="radio" name="sort" /> Close to departure point <span className="sort-icon">🚶‍♂️</span></label>
            <label><input type="radio" name="sort" /> Close to arrival point <span className="sort-icon">🚶‍♂️</span></label>
            <label><input type="radio" name="sort" /> Shortest ride <span className="sort-icon">⏳</span></label>
          </div>
        </div>
        <div className="ride-details">
            <h2>Available Rides</h2>
          <div className="ride-card">
            <div className="ride-top-row">
              <div className="ride-times">
                <span className="ride-time-main">03:10</span>
                <span className="ride-duration">
                  <span className="ride-line"></span>
                  0h10
                  <span className="ride-line"></span>
                </span>
                <span className="ride-time-main">03:20</span>
              </div>
              <div className="ride-fare">₹40.00</div>
            </div>
            <div className="ride-locations">
              <span className="ride-location">Chandigarh</span>
              <span className="ride-location">Chandigarh</span>
            </div>
            <div className="ride-info-row">
              <span className="car-icon">🚗</span>
              <span className="driver-avatar">
                <span className="avatar-blank"></span>
              </span>
              <span className="driver-name">Kasturi Lal</span>
              <span className="booking-type">⚡ Instant Booking</span>
            </div>
          </div>
          <div className="ride-card">
            <div className="ride-top-row">
              <div className="ride-times">
                <span className="ride-time-main">05:00</span>
                <span className="ride-duration">
                  <span className="ride-line"></span>
                  0h30
                  <span className="ride-line"></span>
                </span>
                <span className="ride-time-main">05:30</span>
              </div>
              <div className="ride-fare">₹80.00</div>
            </div>
            <div className="ride-locations">
              <span className="ride-location">Gumthala</span>
              <span className="ride-location">Chandigarh</span>
            </div>
            <div className="ride-info-row">
              <span className="car-icon">🚗</span>
              <span className="driver-avatar">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Bharat" />
              </span>
              <span className="driver-name">Bharat</span>
              <span className="driver-rating">★ 3.0</span>
              <span className="booking-type">⚡ Instant Booking</span>
            </div>
          </div>
        </div>
      </div>
        </div>
        <div className="dashboard-footer">
            <p>© 2025 Sarthi. All rights reserved.</p>
        </div>
    </div>
  );
};

export default DashBoard;
