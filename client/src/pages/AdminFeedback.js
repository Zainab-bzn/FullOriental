import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/AdminFeedback.css";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/feedback");
      setFeedbacks(res.data || []);
    } catch (err) {
      console.log("Error fetching feedbacks:", err);
      alert("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/feedback/${id}`);
      fetchFeedbacks();
      alert("Feedback deleted successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to delete feedback");
    }
  };

  const renderStars = (stars) => {
    return "⭐".repeat(stars);
  };

  if (loading) {
    return <div className="loading">Loading feedbacks...</div>;
  }

  return (
    <div className="admin-feedback">
      <div className="feedback-header">
        <h1>📝 Customer Feedbacks</h1>
        <div className="header-buttons">
          <Link to="/admin/cakes" className="back-btn">
            ← Back to Admin
          </Link>
          <Link to="/admin/customCakes" className="back-btn">
            🎨 Custom Cakes
          </Link>
        </div>
      </div>

      <div className="feedback-stats">
        <div className="stat-card">
          <h3>Total Feedbacks</h3>
          <p className="stat-number">{feedbacks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p className="stat-number">
            {feedbacks.length > 0
              ? (
                  feedbacks.reduce((sum, f) => sum + (f.stars || 0), 0) /
                  feedbacks.length
                ).toFixed(1)
              : "N/A"}
          </p>
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <div className="no-feedbacks">
          <p>No feedbacks yet</p>
        </div>
      ) : (
        <div className="feedbacks-container">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <div className="feedback-header-info">
                <div className="feedback-meta">
                  <h3>Order #{feedback.order_id || "N/A"}</h3>
                  <p className="date">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="feedback-rating">
                  {renderStars(feedback.stars)}
                </div>
              </div>

              {feedback.comment && (
                <div className="feedback-comment">
                  <p>"{feedback.comment}"</p>
                </div>
              )}

              <div className="feedback-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(feedback.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
