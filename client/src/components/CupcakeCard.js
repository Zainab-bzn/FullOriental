import React from "react";
import "../styles/IndividualPage.css";

const CupcakeCart = ({ cupcake }) => {
  return (
    <div className="cupcake-card">
      <img src={cupcake.image} alt={cupcake.name} className="cupcake-image" />

      <h3 className="cupcake-name">{cupcake.name}</h3>
      <p className="cupcake-price">${cupcake.price}</p>

      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default CupcakeCart;
