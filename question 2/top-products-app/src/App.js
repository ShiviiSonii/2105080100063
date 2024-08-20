import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllProducts from "./pages/AllProducts.js";
import ProductDetails from "./pages/ProductDetails.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
