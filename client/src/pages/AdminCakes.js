import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/AdminCakes.css";

const AdminCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/cakes");
      setCakes(res.data);
    } catch (err) {
      console.log("Error fetching cakes:", err);
      alert("Failed to load cakes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cake?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/admin/cakes/${id}`);
      fetchCakes(); // Refresh the list
      alert("Cake deleted successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to delete cake");
    }
  };

  if (loading) {
    return <div className="loading">Loading cakes...</div>;
  }

  return (
    <div className="admin-cakes">
      <h1>🍰 Cake Management</h1>
      
      <div className="header-actions">
        <button className="add-btn">
          <Link to="/admin/addCake" style={{ color: "inherit", textDecoration: "none" }}>
            + Add New Cake
          </Link>
        </button>
        
        <Link to="/cakes" className="view-cakes-btn">
          View on Cakes Page
        </Link>

        <Link to="/admin/feedbacks" className="view-cakes-btn">
          📝 View Feedbacks
        </Link>

        <Link to="/admin/customCakes" className="view-cakes-btn">
          🎨 Custom Cakes Orders
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Image Filename</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cakes.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No cakes found. Add your first cake!
              </td>
            </tr>
          ) : (
            cakes.map((cake) => (
              <tr key={cake.id}>
                <td>{cake.id}</td>
                <td>
                  {cake.photo_path ? (
                    <img
                      src={`http://localhost:8080/images/${cake.photo_path}`}
                      alt={cake.name}
                      className="cake-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span>No image</span>';
                      }}
                    />
                  ) : (
                    <span className="no-image">No image</span>
                  )}
                </td>
                <td>{cake.name}</td>
                <td>
                  <small>{cake.photo_path || "No image"}</small>
                </td>
                <td className="action-buttons">
                  <button className="update-btn">
                    <Link
                      to={`/admin/updateCake/${cake.id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      ✏️ Edit
                    </Link>
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(cake.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCakes;