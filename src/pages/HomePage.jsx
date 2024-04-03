// import React from "react";
import Hero from "../components/Hero/Hero";
import ProductsListing from "./Products/ProductListing";
// import imgTest from "../assets/painting1.png";
// Display :

function HomePage() {
  return (
    <div>
      <Hero />
      {/* <div className="imgtest">
        <img src={imgTest} alt="" />
      </div> */}
      <ProductsListing />
    </div>
  );
}

export default HomePage;
