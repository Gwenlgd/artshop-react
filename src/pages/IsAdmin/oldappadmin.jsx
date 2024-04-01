// import { useState } from "react";
import IsAdmin from "./pages/IsAdmin/IsAdmin";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import NotAllowed from "./pages/IsAdmin/NotAllowed";
import "./App.css";
import ProductDetails from "./pages/Products/ProductDetails";

function App() {
  const role = localStorage.getItem("role");

  // !! problem, check it
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  return (
    <>
      {/* <NavBar onSearch={handleSearch} /> */}
      <NavBar />
      <button
        onClick={() => {
          localStorage.setItem("role", role === "admin" ? "" : "admin");
        }}
      >
        Switch to {role === "admin" ? "User" : "Admin"}
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/admin" element={<IsAdmin />}>
          <Route index element={<h1>Private!</h1>} />
        </Route>
        <Route path="/notallowed" element={<NotAllowed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
