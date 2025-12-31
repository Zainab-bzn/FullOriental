import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CupcakeCart from '../components/CupcakeCart';
import '../styles/BestsellerPage.css';

const BestsellerPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
       
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu-page">
      <div className="catalog-header">
        <Link to="/cupCakeHome" className="back-arrow">
          ❮ Back
        </Link>
        <h1>Best Seller Boxes</h1>
      </div>
      <div className="cupcake-grid">
        {products.map((product) => (
          <CupcakeCart key={product.id} cupcake={product} />
        ))}
      </div>
    </div>
  );
}
