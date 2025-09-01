// src/components/ReviewPage.jsx
import React, { useState } from "react";
import "./ReviewPage.css";

function ReviewPage() {
  const [reviews, setReviews] = useState([
    { name: "John", rating: 5, comment: "Best ride experience ever!" },
    { name: "Sara", rating: 4, comment: "Affordable and reliable service." },
    { name: "Amit", rating: 5, comment: "Very safe for night travel." }
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: "",
    comment: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: "", comment: "" });
    }
  };

  return (
    <div className="review-page">
      <h2>Customer Reviews</h2>

      {/* Review List */}
      <div className="review-list">
        {reviews.map((r, index) => (
          <div key={index} className="review-card">
            <h4>{r.name} ⭐ {r.rating}/5</h4>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <form className="review-form" onSubmit={handleSubmit}>
        <h3>Write a Review</h3>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={newReview.name}
          onChange={handleChange}
        />
        <select
          name="rating"
          value={newReview.rating}
          onChange={handleChange}
        >
          <option value="">Select Rating</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
        <textarea
          name="comment"
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewPage;
