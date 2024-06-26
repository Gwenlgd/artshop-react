// import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/Products/ProductDetails";
import IsAdmin from "./pages/IsAdmin/IsAdmin";
import UpdateProduct from "./pages/IsAdmin/UpdateProduct";
import NotAllowed from "./pages/IsAdmin/NotAllowed";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/IsAdmin/AddProduct";
import ProductsListing from "./pages/Products/ProductListing";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import { CartProvider } from "./pages/ShoppingCart/CartContext";
import ThankyouPage from "./pages/ThankyouPage";
// import FavoritesPage from "./components/Favorites/FavoritesPage";

function App() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/notallowed");
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <CartProvider>
      <>
        {/* <NavBar onSearch={handleSearch} /> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/admin" element={<IsAdmin />} />
          <Route path="/admin/update/:productId" element={<UpdateProduct />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/" element={<ProductsListing />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          {/* <Route path="/favoriteslist" element={<FavoritesPage />} /> */}
          <Route path="/thankyoupage" element={<ThankyouPage />} />
          <Route path="/notallowed" element={<NotAllowed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isHomePage && (
          <footer>
            <div className="footer-main">
              <button className="button-admin" onClick={handleButtonClick}>
                Admin access
                {/* Switch to {role === "admin" ? "User" : "Admin"} */}
              </button>
            </div>
          </footer>
        )}
      </>
    </CartProvider>
  );
}

export default App;
