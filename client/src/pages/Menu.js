import React from "react";
import "../styles/Menu.css";
import { Link } from "react-router-dom";

import menuCake from "../assets/MenuCake.png";
import menuCupcake from "../assets/MenuCupCake.png";

const Menu = () => {
  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Pick Your Pleasure</h1>
      </div>

      <div className="menu-section">
        <div className="menu-item">
          <img src={menuCake} alt="Cakes" className="menu-img" />
          <Link to="/cakes" className="menu-btn">
            Turn Flavors Into Art
          </Link>
        </div>

        <div className="menu-item">
          <img src={menuCupcake} alt="Cupcakes" className="menu-img" />
          <Link to="/cupCakeHome" className="menu-btn">
            Discover Cupcake Bliss
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
