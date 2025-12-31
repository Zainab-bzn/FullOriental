import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutItem from "../components/CheckoutItem";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace('$', ''));
    }
    return parseFloat(price) || 0;
  };

  const formatPrice = (price) => {
    const parsed = parsePrice(price);
    return `$${parsed.toFixed(2)}`;
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userInfo = localStorage.getItem("user");
    
    if (!userId || !userInfo) {
      navigate("/account", { replace: true });
      return;
    }
    
    const user = JSON.parse(userInfo);
    setFormData({
      name: user.username || "",
      email: user.email || "",
      address: "",
    });

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
      navigate("/menu", { replace: true });
      return;
    }
    
    setCartItems(cart);
    
    const total = cart.reduce((sum, item) => {
      const price = parsePrice(item.price);
      return sum + (price * (item.quantity || 1));
    }, 0);
    
    setTotalPrice(total);
    setLoading(false);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill out all form fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem("userId");

      const orderItems = cartItems.map((item) => ({
        name: item.name,
        type: item.type || "cupcake",
        customCakeId: item.customCakeId || null,
        quantity: item.quantity || 1,
        price: parsePrice(item.price),
      }));

      const response = await fetch("http://localhost:8080/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          address: formData.address,
          items: orderItems,
          totalPrice: totalPrice,
          userId: parseInt(userId),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to place order");
      }

      const orderData = await response.json();

      localStorage.removeItem("cart");

      navigate("/thankyou", {
        state: {
          orderNumber: orderData.orderNumber,
          orderId: orderData.orderId,
        },
      });
    } catch (error) {
      alert(error.message || "An error occurred while placing your order");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="checkoutPage">
        <h1 className="checkoutTitle">Checkout</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="checkoutPage">
      <h1 className="checkoutTitle">Checkout</h1>

      <section className="itemsSection">
        <h2 className="sectionTitle">Order Items</h2>
        <div className="itemsGrid">
          {cartItems.map((item, index) => (
            <CheckoutItem
              key={index}
              image={item.image}
              name={`${item.name}${item.quantity > 1 ? ` (x${item.quantity})` : ''}`}
              price={formatPrice(item.price)}
              type={item.type}
              quantity={item.quantity}
            />
          ))}
        </div>
      </section>

      <h2 className="totalPrice">Total Price: ${totalPrice.toFixed(2)}</h2>

      <form className="checkoutForm" onSubmit={(e) => e.preventDefault()}>
        <h2>Delivery Information</h2>
        
        <div className="formGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="address">Delivery Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your full delivery address"
            required
          ></textarea>
        </div>

        <div className="checkout-actions">
          <button
            className="placeOrderButton"
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
          <button
            className="editOrderButton"
            onClick={() => navigate("/cart")}
            type="button"
          >
            Edit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;