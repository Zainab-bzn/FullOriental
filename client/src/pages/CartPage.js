import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import '../styles/AddToCart.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = localStorage.getItem('userId');

  const loadCart = useCallback(() => {
    try {
      const localCartData = localStorage.getItem('cart');
      const localCart = localCartData ? JSON.parse(localCartData) : [];
      
      const cartWithIds = localCart.map((item, index) => ({
        ...item,
        id: item.id || item.customCakeId || `item-${index}`,
      }));
      
      setCartItems(cartWithIds);
      
      const total = cartWithIds.reduce((sum, item) => {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace('$', '')) 
          : parseFloat(item.price);
        return sum + (isNaN(price) ? 0 : price * (item.quantity || 1));
      }, 0);
      
      setTotalPrice(total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadCart();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadCart]);

  const handleRemoveItem = (itemId) => {
    try {
      const targetId = String(itemId);
      
      const updatedCart = cartItems.filter(item => {
        const compareId = String(item.id || item.customCakeId || item.cartId || '');
        return compareId !== targetId;
      });
      
      setCartItems(updatedCart);
      
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const filteredLocal = localCart.filter(item => {
        const compareId = String(item.id || item.customCakeId || '');
        return compareId !== targetId;
      });
      
      localStorage.setItem('cart', JSON.stringify(filteredLocal));
      
      const total = updatedCart.reduce((sum, item) => {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace('$', '')) 
          : parseFloat(item.price);
        return sum + (isNaN(price) ? 0 : price * (item.quantity || 1));
      }, 0);
      setTotalPrice(total);
    } catch (error) {
      alert('Error removing item: ' + error.message);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    if (!userId) {
      alert('Please login to checkout');
      navigate('/account');
      return;
    }
    
    navigate('/checkout');
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    try {
      const targetId = String(itemId);
      
      const updatedCart = cartItems.map(item => {
        const compareId = String(item.id || item.customCakeId || item.cartId || '');
        if (compareId === targetId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      setCartItems(updatedCart);
      
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedLocalCart = localCart.map(item => {
        const compareId = String(item.id || item.customCakeId || '');
        if (compareId === targetId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      localStorage.setItem('cart', JSON.stringify(updatedLocalCart));
      
      const total = updatedCart.reduce((sum, item) => {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace('$', '')) 
          : parseFloat(item.price);
        return sum + (isNaN(price) ? 0 : price * (item.quantity || 1));
      }, 0);
      setTotalPrice(total);
    } catch (error) {
      alert('Error updating quantity: ' + error.message);
    }
  };

  if (loading) return <div className="add-to-cart-page"><p>Loading cart...</p></div>;

  return (
    <div className="add-to-cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>Your cart is empty.</p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
            Debug: localStorage.getItem('cart') = {localStorage.getItem('cart')}
          </p>
        </div>
      ) : (
        <section className="cart-section">
          <h2>Items ({cartItems.length})</h2>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <CartItem 
                key={item.cartId || item.id} 
                item={item}
                onRemove={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CartPage;
