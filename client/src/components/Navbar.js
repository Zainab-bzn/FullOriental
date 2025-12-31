import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          Oriental Patisserie
        </NavLink>

        <button className="nav-toggle" onClick={toggleMenu}>
          <span className={open ? "line line1 open" : "line line1"} />
          <span className={open ? "line line2 open" : "line line2"} />
          <span className={open ? "line line3 open" : "line line3"} />
        </button>

        <nav className={open ? "nav-links open" : "nav-links"}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/menu" className="nav-link" onClick={closeMenu}>
            Menu
          </NavLink>
          <NavLink to="/cart" className="nav-link" onClick={closeMenu}>
            Cart
          </NavLink>
          <NavLink to="/checkout" className="nav-link" onClick={closeMenu}>
            Checkout
          </NavLink>
          <NavLink to="/account" className="nav-link nav-account" onClick={closeMenu}>
            My Account
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
