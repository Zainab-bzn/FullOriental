import React from 'react';
import { individualCupcakes } from '../data/individualCupcakes';
import CupcakeCart from '../components/CupcakeCart';
import '../styles/IndividualPage.css';

const  IndividualPage = () => {
  return (
    <div className="menu-page">
      <h1>Individual Cupcake Flavors</h1>
      <div className="cupcake-grid">
        {individualCupcakes.map((cupcake, id) => (
          <CupcakeCart key={id} cupcake={cupcake} />
        ))}
      </div>
    </div>
  );
}

export default IndividualPage;