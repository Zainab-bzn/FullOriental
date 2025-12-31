import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CustomCake.css";

import birthdayCake from "../assets/BirthdayCake.JPG";
import weddingCake from "../assets/weddingCake.JPG";
import mothersDayCake from "../assets/MothersDayCake.JPG";
import anniversaryCake from "../assets/anniversaryCake.JPG";
import genderRevealCake from "../assets/genderRevealCake.JPG";
import graduationCake from "../assets/GradautionCake.JPG";
import valentineCake from "../assets/valentineCake.JPG";
import newYearCake from "../assets/newYearCake.JPG";
import iceCreamCake from "../assets/iceCreamCake.JPG";
import englishCake from "../assets/EnglishCake.JPG";

const imageMap = {
  "BirthdayCake.JPG": birthdayCake,
  "weddingCake.JPG": weddingCake,
  "MothersDayCake.JPG": mothersDayCake,
  "anniversaryCake.JPG": anniversaryCake,
  "genderRevealCake.JPG": genderRevealCake,
  "GradautionCake.JPG": graduationCake,
  "valentineCake.JPG": valentineCake,
  "newYearCake.JPG": newYearCake,
  "iceCreamCake.JPG": iceCreamCake,
  "EnglishCake.JPG": englishCake,
};

const CustomCake = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const cakeTypeId = parseInt(query.get("id")) || null;
  const cakeName = query.get("name") || "Custom Cake";
  const photoPath = query.get("image") ? decodeURIComponent(query.get("image")) : null;
  const cakeImage = photoPath ? imageMap[photoPath] : null;

  const [selectedImage, setSelectedImage] = useState(cakeImage);
  const [tiers, setTiers] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [addons, setAddons] = useState([]);
  const [tierPrice, setTierPrice] = useState(0);
  const [tierId, setTierId] = useState(null);
  const [fillingPrice, setFillingPrice] = useState(0);
  const [fillingId, setFillingId] = useState(null);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [uploadPrice, setUploadPrice] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login or register to customize a cake");
      navigate("/account", { replace: true });
      return;
    }
    fetchOptions();
  }, [navigate]);

  const fetchOptions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/custom-cake/options");
      setTiers(res.data.tiers);
      setFillings(res.data.fillings);
      setAddons(res.data.addons);
      
      if (res.data.tiers.length > 0) {
        setTierId(res.data.tiers[0].id);
        setTierPrice(res.data.tiers[0].price);
      }
      
      if (res.data.fillings.length > 0) {
        setFillingId(res.data.fillings[0].id);
        setFillingPrice(res.data.fillings[0].price);
      }
      
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadPrice(2);
      setUploadedFile(file);
    }
  };

  const handleAddonChange = (e, price, addonId) => {
    if (e.target.checked) {
      setAddonsPrice((p) => p + price);
      setSelectedAddons((prev) => [...prev, addonId]);
    } else {
      setAddonsPrice((p) => p - price);
      setSelectedAddons((prev) => prev.filter((id) => id !== addonId));
    }
  };

  const handleSaveCustomCake = async (e) => {
    e.preventDefault();

    if (!cakeTypeId) {
      alert("Cake Type ID is required");
      return;
    }

    try {
      let referencePhotoPath = null;

      if (uploadedFile) {
        const formData = new FormData();
        formData.append("file", uploadedFile);

        const uploadRes = await axios.post("http://localhost:8080/upload-reference", formData);
        referencePhotoPath = uploadRes.data.filePath;
      }

      const customCakeData = {
        cakeTypeId,
        cakeName,
        tierId,
        fillingId,
        addons: selectedAddons.length > 0 ? selectedAddons : null,
        notes: notes || null,
        referencePhoto: referencePhotoPath,
        totalPrice: total,
        userId: localStorage.getItem("userId"),
      };

      const res = await axios.post("http://localhost:8080/custom-cake/save", customCakeData);

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({
        customCakeId: res.data.customCakeId,
        type: "custom_cake",
        name: cakeName,
        price: total,
        quantity: 1,
        image: referencePhotoPath || cakeImage,
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Custom cake saved and added to cart!");
      navigate("/cart");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const total = tierPrice + fillingPrice + addonsPrice + uploadPrice;

  if (loading) {
    return <div className="custom-cake-wrapper"><p>Loading cake options...</p></div>;
  }

  return (
    <div className="custom-cake-wrapper">
      <div className="catalog-header">
        <Link to="/cakes" className="back-arrow">
          ❮ Back
        </Link>
        <h1>{cakeName}</h1>
      </div>

      <div className="custom-cake-container">
        <div className="cake-image">
          <img src={selectedImage} alt={cakeName} />
        </div>

        <div className="cake-details">
          <form className="custom-form" onSubmit={handleSaveCustomCake}>
            <h2>Select Tier</h2>
            <div className="option-cards">
              {tiers.map((t) => (
                <label className="card" key={t.id}>
                  <input
                    type="radio"
                    name="tier"
                    onChange={() => {
                      setTierPrice(t.price);
                      setTierId(t.id);
                    }}
                  />
                  <span>{t.tier_name} - ${t.price}</span>
                </label>
              ))}
            </div>

            <h2>Select Filling</h2>
            <div className="option-cards">
              {fillings.map((f) => (
                <label className="card" key={f.id}>
                  <input
                    type="radio"
                    name="filling"
                    onChange={() => {
                      setFillingPrice(f.price);
                      setFillingId(f.id);
                    }}
                  />
                  <span>{f.filling_name} - ${f.price}</span>
                </label>
              ))}
            </div>

            <h2>Add-ons</h2>
            <div className="option-cards">
              {addons.map((a) => (
                <label className="card" key={a.id}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleAddonChange(e, a.price, a.id)}
                  />
                  <span>{a.addon_name} - ${a.price}</span>
                </label>
              ))}
            </div>

            <h2>Additional Notes</h2>
            <textarea
              placeholder="Add your description here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>

            <div className="cake-upload">
              <label>
                <strong>Upload a reference photo:</strong>
                <span className="price-note"> (+$2)</span>
              </label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="total-price">Total: ${total}</div>
            <button type="submit" className="add-cart-btn">
              Save Custom Cake
            </button>

            {error && <p style={{ color: "red" }}>Something went wrong!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomCake;