import React from "react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="icon-circle"
          title="Follow us on Instagram"
        >
          <FaInstagram />
        </a>
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="icon-circle"
          title="Follow us on Facebook"
        >
          <FaFacebookF />
        </a>
        <a 
          href="https://wa.me/961XXXXXXXX" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="icon-circle"
          title="Chat with us on WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>

      <p className="footer-text">
        © 2025 Oriental Patisserie — Made with{" "}
        <span className="heart">❤️</span> in Lebanon
      </p>
    </footer>
  );
}

export default Footer;
