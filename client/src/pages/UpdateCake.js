import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/AddCakes.css";

const UpdateCake = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCake();
  }, []);

  const fetchCake = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/cakes/${id}`);
      setName(res.data.name);
      setCurrentImage(res.data.photo_path);
    } catch (err) {
      console.log("Error fetching cake:", err);
      setError("Failed to load cake");
    } finally {
      setLoading(false);
    }
  };

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
      await axios.post(`http://localhost:8080/admin/updateCake/${id}`, formData);
      alert("Cake updated successfully!");
      navigate("/admin/cakes");
    } catch (err) {
      console.log(err);
      setError("Failed to update cake");
    }
  };

  if (loading) {
    return <div className="loading">Loading cake...</div>;
  }

  return (
    <div className="add-cake">
      <h1>Edit Cake</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cake Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Update Cake Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <small>Leave empty to keep current image</small>
          
          {currentImage && (
            <div className="current-image">
              <p>Current Image:</p>
              <img 
                src={`http://localhost:8080/images/${currentImage}`} 
                alt="Current" 
                className="preview-image"
              />
            </div>
          )}
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Update Cake
          </button>
          <Link to="/admin/cakes" className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateCake;