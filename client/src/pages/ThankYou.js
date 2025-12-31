import axios from "axios";
import { useState } from "react";
import "../styles/ThankYou.css";

const ThankYou = () => {
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);

  const submitFeedback = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const orderId = localStorage.getItem("lastOrderId");

      await axios.post("http://localhost:8080/feedback", {
        userId,
        orderId,
        stars,
        comment,
      });

      setDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="thankyou-container">
      <div className="thankyou-box">
        <h1>Thank You!</h1>
        <p>Your order has been placed successfully.</p>

        <div className="rating">
          <label>Rate your experience</label>
          <select
            value={stars}
            onChange={(e) => setStars(parseInt(e.target.value))}
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </div>

        <textarea
          className="feedback-textarea"
          placeholder="Write feedback (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="submit-btn" onClick={submitFeedback}>
          Submit Feedback
        </button>

        {done && <p className="success-msg">Thank you for your feedback!</p>}
      </div>
    </div>
  );
};

export default ThankYou;
