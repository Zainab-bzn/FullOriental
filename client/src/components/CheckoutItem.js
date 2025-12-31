import React from "react";
import "../styles/CheckoutPage.css";

const CheckoutItem = ({ image, name, price, quantity, type }) => {
  const getImageSource = (imagePath) => {
    if (!imagePath) return '/assets/MenuCake.png';
    // If it's a server-hosted image (starts with http or /images), use it directly
    if (imagePath.startsWith('http') || imagePath.startsWith('/images')) {
      return imagePath;
    }
    // If it's a filename, construct the server URL
    if (!imagePath.startsWith('/')) {
      return `http://localhost:8080/images/${imagePath}`;
    }
    return imagePath;
  };

  return (
    <div className="checkoutItem">
      <img 
        src={getImageSource(image)} 
        alt={name} 
        className="checkoutItemImage"
        onError={(e) => { e.target.src = '/assets/MenuCake.png'; }}
      />
      <div className="checkoutItemDetails">
        <h3 className="checkoutItemName">{name}</h3>
        {quantity && quantity > 1 && (
          <p className="checkoutItemQuantity">Quantity: {quantity}</p>
        )}
        {type && (
          <p className="checkoutItemType">Type: {type}</p>
        )}
        <p className="checkoutItemPrice">{price || "Price not available"}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;