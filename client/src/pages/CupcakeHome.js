import React from 'react';
import { Link } from 'react-router-dom';
import individualPreview from '../assets/individual-preview.jpg';
import bestSellersPreview from '../assets/best-sellers-preview.jpg';
import '../styles/CupcakeHome.css';

const CupcakeHome = () => {
  return (
    <div className="cupcake-page">

  
      <div className="catalog-header">
        <Link to="/menu" className="back-arrow">❮ Back</Link>
        <h1>Welcome to Cupcake World</h1>
      </div>

      <div className="image-row">
        <div className="image-block">
          <Link to="/individual">
            <img src={individualPreview} alt="Individual Cupcake Flavors" className="circle-image" />
          </Link>
          <h2>
            <Link to="/individual" className="text-link">Individual Cupcake Flavors</Link>
          </h2>
        </div>

        <div className="image-block">
          <Link to="/best-sellers">
            <img src={bestSellersPreview} alt="Best Seller Boxes" className="circle-image" />
          </Link>
          <h2>
            <Link to="/best-sellers" className="text-link">Best Seller Boxes</Link>
          </h2>
        </div>
      </div>

    </div>
  );
}

export default CupcakeHome;
