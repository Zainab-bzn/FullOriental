import React, { useState, useEffect } from 'react';
import CupcakeCart from '../components/CupcakeCart';
import '../styles/IndividualCupcakes.css';


const fallbackCupcakes = [
  { id: 1, name: 'Cookie Monster', description: 'Delicious cookie-flavored cupcake with chocolate chips', price: '$5.95', image: '/assets/cookie-monster.jpg' },
  { id: 2, name: 'Rainbow Cupcake', description: 'Colorful rainbow-layered cupcake with sprinkles', price: '$5.95', image: '/assets/rainbow.jpg' },
  { id: 3, name: 'Red Velvet Cupcake', description: 'Classic red velvet with cream cheese frosting', price: '$4.95', image: '/assets/red-velvet.jpg' },
  { id: 4, name: 'Peanut Buttercream Cupcake', description: 'Rich peanut butter flavor with creamy frosting', price: '$4.95', image: '/assets/peanut-butter.jpg' },
  { id: 5, name: 'Poop Emoji Cupcake', description: 'Fun emoji-shaped cupcake for special occasions', price: '$5.95', image: '/assets/poop-emoji.jpg' },
];

const IndividualPage = () => {
  const [cupcakes, setCupcakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCupcakes();
  }, []);

  const fetchCupcakes = async () => {
    try {
      const response = await fetch('http://localhost:8080/individual-cupcakes');
      if (!response.ok) {
        throw new Error('Failed to fetch cupcakes');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setCupcakes(data);
      } else {
        setCupcakes(fallbackCupcakes);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cupcakes:', err);
      setCupcakes(fallbackCupcakes);
      setError(null);
      setLoading(false);
    }
  };

  if (loading) return <div className="menu-page"><p>Loading cupcakes...</p></div>;
  if (error) return <div className="menu-page"><p>Error: {error}</p></div>;

  return (
    <div className="menu-page">
      <h1>Individual Cupcake Flavors</h1>
      <div className="cupcake-grid">
        {cupcakes && cupcakes.length > 0 ? (
          cupcakes.map((cupcake) => (
            <CupcakeCart key={cupcake.id} cupcake={cupcake} />
          ))
        ) : (
          <p>No cupcakes available</p>
        )}
      </div>
    </div>
  );
}

export default IndividualPage;