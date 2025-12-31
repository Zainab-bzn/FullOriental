import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CupcakeCart from '../components/CupcakeCart';
import '../styles/BestSellerCupCakes.css';


const fallbackBestSellers = [
  { id: 1, name: '6 PC Fun Assortment', description: 'Mix of 6 fun assorted cupcakes', price: '$35.95', image: '/assets/fun-assortment.jpg' },
  { id: 2, name: 'Happy Birthday Dozen Box', description: 'A dozen birthday-themed cupcakes', price: '$59.50', image: '/assets/hbd-dozen.jpg' },
  { id: 3, name: '6 PC Celebration Cupcakes', description: 'Perfect for celebrations and parties', price: '$27.95', image: '/assets/celebration.jpg' },
  { id: 4, name: '6 PC Rainbow Cupcakes', description: 'Rainbow-colored assorted cupcakes', price: '$35.95', image: '/assets/rainbow-box.jpg' },
];

const BestsellerPage = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const response = await fetch('http://localhost:8080/best-seller-cupcakes');
      if (!response.ok) {
        throw new Error('Failed to fetch best sellers');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setBestSellers(data);
      } else {
        setBestSellers(fallbackBestSellers);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching best sellers:', err);
      setBestSellers(fallbackBestSellers);
      setError(null);
      setLoading(false);
    }
  };

  if (loading) return <div className="menu-page"><p>Loading best sellers...</p></div>;
  if (error) return <div className="menu-page"><p>Error: {error}</p></div>;

  return (
    <div className="menu-page">
      <div className="catalog-header">
        <Link to="/cupCakeHome" className="back-arrow">
          ❮ Back
        </Link>
        <h1>Best Seller Boxes</h1>
      </div>
      <div className="cupcake-grid">
        {bestSellers && bestSellers.length > 0 ? (
          bestSellers.map((box) => (
            <CupcakeCart key={box.id} cupcake={box} />
          ))
        ) : (
          <p>No best sellers available</p>
        )}
      </div>
    </div>
  );
}

export default BestsellerPage;
