import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AddCakes.css";

const AddCake = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name) {
      setError("Cake name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post("http://localhost:8080/admin/addCake", formData);
      alert("Cake added successfully!");
      navigate("/admin/cakes");
    } catch (err) {
      console.log(err);
      setError("Failed to add cake");
    }
  };

  return (
    <div className="add-cake">
      <h1>Add New Cake</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cake Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Birthday Cake, Wedding Cake"
            required
          />
        </div>

        <div className="form-group">
          <label>Cake Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <small>Upload a photo of the cake</small>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Add Cake
          </button>
          <Link to="/admin/cakes" className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddCake;