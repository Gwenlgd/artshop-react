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

function App() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // put it in AdminDashboard
  // const [products, setProducts] = useState();

  // function addProduct(product) {
  //   setProduct([...products, product]);
  // }

  const handleButtonClick = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/NotAllowed");
    }
  };

  // !! problem, check it
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  return (
    <>
      {/* <NavBar onSearch={handleSearch} /> */}
      <NavBar />
      <button onClick={handleButtonClick}>
        Switch to {role === "admin" ? "User" : "Admin"}
      </button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/admin" element={<IsAdmin />} />
        <Route path="/admin/update/:productId" element={<UpdateProduct />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/notallowed" element={<NotAllowed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
