import "../styles/Home.css";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import anniversaryCake from "../assets/anniversaryCake.JPG";
import GradautionCake from "../assets/GradautionCake.JPG";

import Home1 from "../assets/Home1.jpg";
import Home2 from "../assets/Home2.jpg";
import Home3 from "../assets/Home3.jpg";
import Home4 from "../assets/Home4.jpg";

import review1 from "../assets/review1.png";
import review2 from "../assets/review2.png";
import review3 from "../assets/review3.png";
import review4 from "../assets/review4.png";


import { useState } from "react";

const reviews = [review1, review2, review3, review4];

const Home = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((old) => (old === 0 ? reviews.length - 1 : old - 1));
  };

  const next = () => {
    setIndex((old) => (old === reviews.length - 1 ? 0 : old + 1));
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>

        <img src={logo} alt="Oriental Patisserie" className="hero-logo" />

        <p className="hero-tagline">Your Sweetest Moments Since 1992</p>

        <a href="/menu" className="hero-btn">
          Explore Menu
        </a>
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Founded in the heart of <strong>Tyre</strong>, we bring the finest
          French & Lebanese pastries, handmade with love and tradition.
        </p>
      </section>

      <section className="signature">
        <h2>Signature Delights</h2>
        <p>
          Enjoy our <strong>handcrafted cakes</strong> — from
          <strong> classic favorites </strong> to
          <strong> custom creations</strong>, made to satisfy your sweet dreams.
          Each <strong>rich chocolate</strong> and{" "}
          <strong>delicate vanilla</strong> cake is crafted with love for your
          perfect celebration.
        </p>
      </section>

      <section className="features">
        <div className="feature-row">
          <img src={Home1} alt="Cakes Low in Sugar" />
          <div className="feature-text">
            <h3>Cakes Low in Sugar</h3>
            <p>
              We have options that satisfy your sweet tooth without the guilt.
            </p>
          </div>
        </div>

        <div className="feature-row">
          <img src={Home3} alt="Customize Cake" />
          <div className="feature-text">
            <h3>Customize Your Own Cake</h3>
            <p>
              We’ll bring your sweetest ideas to life — exactly as you imagine.
            </p>
          </div>
        </div>

        <div className="feature-row">
          <img src={Home2} alt="Natural Ingredients" />
          <div className="feature-text">
            <h3>Natural Ingredients</h3>
            <p>
              We use only real, honest ingredients for clean, authentic flavor.
            </p>
          </div>
        </div>

        <div className="feature-row">
          <img src={Home4} alt="Delivery" />
          <div className="feature-text">
            <h3>Delivery or Takeout</h3>
            <p>
              We bring our patisserie to your door, or pack it fresh for pickup.
            </p>
          </div>
        </div>
      </section>

      {/* DISCOUNT BANNER */}
      <section className="discount-banner">
        <div className="discount-inner">
          <p className="discount-eyebrow">SPECIAL OFFER</p>
          <h2 className="discount-title"> Get A 10% Discount! </h2>
          <p className="discount-text">
            Sign in now and enjoy 10% off your first order.
          </p>
          <a href="/account" className="discount-cta">
            Sign In
          </a>
        </div>
      </section>

      <section className="best-selling">
        <h2>Our Best Selling For This Month</h2>

        <div className="best-grid">
          <div className="best-card">
            <div className="best-img">
              <img src={GradautionCake} alt="Graduation Cake" />
            </div>
            <div className="card-text">Graduation Cake</div>
          </div>

         
          <div className="best-card">
            <div className="best-img">
              <img src={anniversaryCake} alt="Anniversary Cake" />
            </div>
            <div className="card-text">Anniversary Cake</div>
          </div>
        </div>

        <Link to="/custom-cake" className="custom-cake-btn">
          Create Your Custom Cake
        </Link>
      </section>

      <section className="feedback-section">
        <h2 className="feedback-title">Customer Feedback</h2>

        <div className="feedback-wrapper">
          <button className="arrow left" onClick={prev}>
            ❮
          </button>

          <div className="feedback-card fade">
            <img src={reviews[index]} alt="Customer feedback" />
          </div>

          <button className="arrow right" onClick={next}>
            ❯
          </button>
        </div>
      </section>
  
    </div>
  );
};

export default Home;
