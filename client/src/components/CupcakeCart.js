import React from 'react';
import '../styles/CupcakeCart.css';

const CupcakeCart = ({ cupcake }) =>{

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists
    const existingItem = cart.find(item => item.id === cupcake.id);
    
    if (existingItem) {
      // If it exists, increment quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Add new item with quantity 1
      cart.push({
        ...cupcake,
        quantity: 1,
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Item added to cart:', cupcake);
    console.log('Cart contents:', cart);
    alert('Added to cart!');
    window.location.href = '/cart';
  }

  console.log('Cupcake image path:', cupcake.image);
  return (
    <div className="add-to-cart-card">
      <img src={cupcake.image} alt={cupcake.name} className="add-to-cart-image" />
      <h3 className="add-to-cart-name">{cupcake.name}</h3>
      <p className="add-to-cart-price">{cupcake.price}</p>
      <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
    </div>
  );
}

export default CupcakeCart;
