import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-image">
        {/* <h2>Hero</h2> */}
        <img
          src="https://res.cloudinary.com/djiyytmot/image/upload/v1712171974/pexels-steve-johnson-1981468_s86alq.jpg"
          alt="test hero"
        />
      </div>
    </div>
  );
}

export default Hero;
