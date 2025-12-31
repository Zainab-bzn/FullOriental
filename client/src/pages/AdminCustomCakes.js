import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminCustomCakes.css";

const AdminCustomCakes = () => {
  const [customCakes, setCustomCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomCakes();
  }, []);

  const fetchCustomCakes = async () => {
    try {
      console.log("Fetching custom cakes from http://localhost:8080/admin/custom-cakes");
      const res = await axios.get("http://localhost:8080/admin/custom-cakes");
      console.log("Custom cakes fetched successfully:", res.data);
      setCustomCakes(res.data || []);
    } catch (err) {
      console.error("Error fetching custom cakes:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error message:", err.message);
      console.error("Error status:", err.response?.status);
      alert("Failed to load custom cakes:\n" + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getImageSource = (imagePath) => {
    if (!imagePath) return '/assets/MenuCake.png';
    if (imagePath.startsWith('http') || imagePath.startsWith('/images')) {
      return imagePath;
    }
    if (!imagePath.startsWith('/')) {
      return `http://localhost:8080/images/${imagePath}`;
    }
    return imagePath;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return <div className="loading">Loading custom cakes...</div>;
  }

  return (
    <div className="admin-custom-cakes">
      <div className="admin-header">
        <h1>Custom Cakes Orders</h1>
        <p className="cake-count">Total Custom Cakes: {customCakes.length}</p>
      </div>

      {customCakes.length === 0 ? (
        <div className="no-cakes">
          <p>No custom cakes found</p>
        </div>
      ) : (
        <div className="cakes-grid">
          {customCakes.map((cake) => (
            <div key={cake.id} className="cake-card">
              <div className="cake-image-wrapper">
                <img
                  src={getImageSource(cake.reference_photo)}
                  alt={`Custom Cake ${cake.id}`}
                  className="cake-image"
                  onError={(e) => {
                    e.target.src = '/assets/MenuCake.png';
                  }}
                />
              </div>

              <div className="cake-details">
                <div className="cake-header">
                  <h3>Cake #{cake.id}</h3>
                  <span className="cake-date">{formatDate(cake.created_at)}</span>
                </div>

                <div className="cake-info">
                  <p>
                    <strong>Cake Type:</strong> {cake.cake_type_name || cake.cake_type}
                  </p>
                  <p>
                    <strong>Tier:</strong> {cake.tier_name || 'Not specified'}
                  </p>
                  <p>
                    <strong>Filling:</strong> {cake.filling_name || 'Not specified'}
                  </p>
                  {cake.addons && cake.addons.length > 0 && (
                    <p>
                      <strong>Add-ons:</strong>
                      <ul className="addons-list">
                        {cake.addons.map((addon, idx) => (
                          <li key={idx}>{addon.addon_name || addon}</li>
                        ))}
                      </ul>
                    </p>
                  )}
                  {cake.notes && (
                    <p>
                      <strong>Notes:</strong> <em>{cake.notes}</em>
                    </p>
                  )}
                  <p className="cake-price">
                    <strong>Price:</strong> ${parseFloat(cake.total_price).toFixed(2)}
                  </p>
                </div>

                <div className="cake-user">
                  <p>
                    <strong>User ID:</strong> {cake.user_id || 'Guest'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCustomCakes;
