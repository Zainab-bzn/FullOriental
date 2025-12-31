import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Account.css";
import axios from "axios";

const Account = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regMsg, setRegMsg] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const user = localStorage.getItem("user");
    if (userId && user) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(user));
      setEditUsername(JSON.parse(user).username);
      setEditEmail(JSON.parse(user).email);
      fetchOrders(userId);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      setOrdersLoading(true);
      const response = await fetch(`http://localhost:8080/user-orders/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserInfo(null);
    setOrders([]);
    setMessage("✔ Logged out successfully!");
    setActiveTab("profile");
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegMsg("");
    setRegisterLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/register", {
        username: regUsername,
        email: regEmail,
        password: regPassword,
      });

      localStorage.setItem("userId", res.data.userId);
      
      const userData = {
        id: res.data.userId,
        username: regUsername,
        email: regEmail
      };
      localStorage.setItem("user", JSON.stringify(userData));
      
      setIsLoggedIn(true);
      setUserInfo(userData);
      setEditUsername(regUsername);
      setEditEmail(regEmail);
      
      setRegMsg("✔ Registered successfully! You can now customize cakes.");
      
      setTimeout(() => {
        navigate("/cakes");
      }, 1500);
    } catch (err) {
      if (err?.response?.status === 409) setRegMsg("❌ Email already exists");
      else if (err?.response?.status === 400) setRegMsg("❌ Missing fields");
      else setRegMsg("❌ Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoginLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/login", {
        identifier: username,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userId", res.data.user.id);
      
      setIsLoggedIn(true);
      setUserInfo(res.data.user);
      setEditUsername(res.data.user.username);
      setEditEmail(res.data.user.email);
      
      setMessage("✔ Login successful!");
      fetchOrders(res.data.user.id);
      
      setTimeout(() => {
        navigate("/cakes");
      }, 1000);
    } catch (err) {
      setMessage("❌ Incorrect username/email or password");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setUpdateLoading(true);
    
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:8080/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: editUsername,
          email: editEmail,
        }),
      });

      if (response.ok) {
        const updatedUser = { ...userInfo, username: editUsername, email: editEmail };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUserInfo(updatedUser);
        setProfileMsg("✔ Profile updated successfully!");
        setTimeout(() => setProfileMsg(""), 3000);
        setEditMode(false);
      } else {
        setProfileMsg("❌ Failed to update profile");
      }
    } catch (error) {
      setProfileMsg("❌ Error updating profile");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="account-page">
      <div className="breadcrumb">Home / My Account</div>
      <h1 className="account-title">My Account</h1>

      {message && <p className="login-message center-message">{message}</p>}

      {isLoggedIn && userInfo ? (
        <div className="account-container">
          
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              My Orders
            </button>
          </div>

          
          {activeTab === "profile" && (
            <div className="tab-content">
              {profileMsg && <p className="login-message center-message">{profileMsg}</p>}
              
              {!editMode ? (
                <div className="profile-tab">
                  <h2>Welcome, {userInfo.username}!</h2>
                  <div className="profile-info">
                    <p><strong>Username:</strong> {userInfo.username}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile}>
                  <h2>Edit Profile</h2>
                  
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={updateLoading}
                    >
                      {updateLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setEditMode(false)}
                      disabled={updateLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          
          {activeTab === "orders" && (
            <div className="tab-content">
              <h2>My Orders</h2>
              
              {ordersLoading ? (
                <p className="loading-text">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="empty-state">
                  No orders yet. <a href="/menu">Start shopping!</a>
                </p>
              ) : (
                <div className="order-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="order-header">
                        <div>
                          <p className="order-number">Order #{order.orderNumber}</p>
                          <p className="order-date">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="order-total">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      
                      {order.items && order.items.length > 0 && (
                        <div className="order-items">
                          <p className="order-items-title">Items:</p>
                          {order.items.map((item, idx) => (
                            <p key={idx} className="order-item-detail">
                              • {item.itemName} x{item.quantity}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="form-actions" style={{ justifyContent: "center", marginTop: "30px" }}>
            <button
              onClick={handleLogout}
              className="btn-danger"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
         
          <form className="login-card" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username or Email Address *</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁" : "👁‍🗨"}
                </span>
              </div>
            </div>

            <div className="remember-row">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button className="login-btn" type="submit" disabled={loginLoading}>
              {loginLoading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>

         
          <form className="login-card" onSubmit={handleRegister}>
            <h2>Register</h2>

            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <button className="login-btn" type="submit" disabled={registerLoading}>
              {registerLoading ? "REGISTERING..." : "REGISTER"}
            </button>

            {regMsg && <p className="login-message">{regMsg}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default Account;