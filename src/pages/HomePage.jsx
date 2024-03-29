// import React from "react";
import ProductsListing from "./Products/ProductListing";
// import imgTest from "../assets/painting1.png";
// Display :

function HomePage() {
  return (
    <div>
      <h2>Home Page</h2>
      {/* <div className="imgtest">
        <img src={imgTest} alt="" />
      </div> */}
      <ProductsListing />
    </div>
  );
}

export default HomePage;
