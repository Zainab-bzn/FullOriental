import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Cakes.css";

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

// Fallback static data
const fallbackCakes = [
  { id: 1, name: 'Birthday Cake', photo_path: 'BirthdayCake.JPG' },
  { id: 2, name: 'Wedding Cake', photo_path: 'weddingCake.JPG' },
  { id: 3, name: 'Mother\'s Day Cake', photo_path: 'MothersDayCake.JPG' },
  { id: 4, name: 'Anniversary Cake', photo_path: 'anniversaryCake.JPG' },
  { id: 5, name: 'Gender Reveal Cake', photo_path: 'genderRevealCake.JPG' },
  { id: 6, name: 'Graduation Cake', photo_path: 'GradautionCake.JPG' },
  { id: 7, name: 'Valentine Cake', photo_path: 'valentineCake.JPG' },
  { id: 8, name: 'New Year Cake', photo_path: 'newYearCake.JPG' },
  { id: 9, name: 'Ice Cream Cake', photo_path: 'iceCreamCake.JPG' },
  { id: 10, name: 'English Cake', photo_path: 'EnglishCake.JPG' },
];

const Cakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cake-types");

        if (response.data && response.data.length > 0) {
          setCakes(response.data);
        } else {
          setCakes(fallbackCakes);
        }
      } catch (error) {
        console.error("Error fetching cakes:", error);
        setCakes(fallbackCakes);
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  const handleTap = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const getImageSource = (photoPath) => {
    if (imageMap[photoPath]) {
      return imageMap[photoPath];
    }
    if (photoPath) {
      return `http://localhost:8080/images/${photoPath}`;
    }
    return birthdayCake;
  };

  if (loading) {
    return (
      <div className="cakes-page">
        <p>Loading cakes...</p>
      </div>
    );
  }

  return (
    <div className="cakes-page">
      <div className="catalog-header">
        <Link to="/menu" className="back-arrow">
          ❮ Back
        </Link>
        <h1>Cakes</h1>
      </div>

      <div className="catalog-container">
        {cakes.length > 0 ? (
          cakes.map((cake, index) => (
            <div 
              key={cake.id} 
              className={`catalog-box ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleTap(index)}
            >
              <img 
                src={getImageSource(cake.photo_path)}
                alt={cake.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = birthdayCake;
                }}
              />

              <div className="custom-overlay">
                <Link
                  to={`/custom-cake?id=${cake.id}&name=${encodeURIComponent(cake.name)}&image=${encodeURIComponent(cake.photo_path)}`}
                  className="custom-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  Custom Cake
                </Link>
              </div>

              <div className="cake-label">{cake.name}</div>
            </div>
          ))
        ) : (
          <p className="no-cakes">No cakes available</p>
        )}
      </div>
    </div>
  );
};

export default Cakes;