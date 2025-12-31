import React from 'react';
import '../styles/CartItem.css';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  // Helper function to parse price safely
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace('$', '').trim()) || 0;
    }
    return parseFloat(price) || 0;
  };

  const itemPrice = parsePrice(item.price);
  const itemQuantity = item.quantity || 1;
  const itemTotal = itemPrice * itemQuantity;

  const itemId = item.cartId || item.id;

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

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(itemId);
    } else {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <img 
        src={getImageSource(item.image)} 
        alt={item.name} 
        className="cart-item-image" 
        onError={(e) => { e.target.src = '/assets/MenuCake.png'; }}
      />
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name || 'Unknown Item'}</h3>
        <p className="cart-item-price">${itemPrice.toFixed(2)}</p>
      </div>

      <div className="cart-item-quantity">
        <button 
          className="qty-btn"
          onClick={() => handleQuantityChange(itemQuantity - 1)}
        >
          −
        </button>
        <input 
          type="number" 
          min="1" 
          value={itemQuantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="qty-input"
        />
        <button 
          className="qty-btn"
          onClick={() => handleQuantityChange(itemQuantity + 1)}
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        ${itemTotal.toFixed(2)}
      </div>

      <button 
        className="cart-item-remove"
        onClick={() => onRemove(itemId)}
        title="Remove item"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
