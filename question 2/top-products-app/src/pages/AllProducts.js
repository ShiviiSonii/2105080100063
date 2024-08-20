import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Product 1",
      company: "Company A",
      category: "Electronics",
      price: 100,
      rating: 4.5,
      discount: 10,
      availability: true,
    },
    {
      id: 2,
      name: "Product 2",
      company: "Company B",
      category: "Clothing",
      price: 50,
      rating: 4.0,
      discount: 5,
      availability: false,
    },
    {
      id: 3,
      name: "Product 3",
      company: "Company B",
      category: "Clothing",
      price: 50,
      rating: 4.0,
      discount: 5,
      availability: false,
    },
    {
      id: 4,
      name: "Product 4",
      company: "Company A",
      category: "Electronics",
      price: 50,
      rating: 4.0,
      discount: 5,
      availability: false,
    },
  ]);

  const [filters, setFilters] = useState({
    category: "",
    company: "",
    rating: "",
    minPrice: 0,
    maxPrice: 1000,
    availability: "",
  });

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        (filters.category === "" || product.category === filters.category) &&
        (filters.company === "" || product.company === filters.company) &&
        (filters.rating === "" || product.rating >= Number(filters.rating)) &&
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        (filters.availability === "" ||
          product.availability.toString() === filters.availability)
      );
    });
  };

  const filteredProducts = filterProducts(products);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceRangeChange = (event) => {
    const [minPrice, maxPrice] = event.target.value.split(",").map(Number);
    setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
  };

  return (
    <div className="container">
      <h1>All Products</h1>
      <div className="filters">
        <select name="category" onChange={handleFilterChange}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>

        <select name="company" onChange={handleFilterChange}>
          <option value="">Select Company</option>
          <option value="Company A">Company A</option>
          <option value="Company B">Company B</option>
        </select>

        <input
          type="number"
          name="rating"
          placeholder="Minimum Rating"
          onChange={handleFilterChange}
        />

        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={`${filters.minPrice},${filters.maxPrice}`}
          onChange={handlePriceRangeChange}
        />
        <p>
          Price Range: ${filters.minPrice} - ${filters.maxPrice}
        </p>

        <select name="availability" onChange={handleFilterChange}>
          <option value="">Select Availability</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={`https://via.placeholder.com/150?text=${product.name}`}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p>Company: {product.company}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}%</p>
              <p>
                Availability:{" "}
                {product.availability ? "In Stock" : "Out of Stock"}
              </p>
              <Link to={`/product/${product.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
