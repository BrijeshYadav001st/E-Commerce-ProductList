import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=100');
      setProducts(response.data.products); // Assuming response contains a 'products' array
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = () => {
    let tempProducts = [...filteredProducts];

    if (brandFilter) {
      tempProducts = tempProducts.filter((product) => product.brand === brandFilter);
    }

    if (categoryFilter) {
      tempProducts = tempProducts.filter((product) => product.category === categoryFilter);
    }

    setFilteredProducts(tempProducts);
  };

  const sortProducts = () => {
    let tempProducts = [...filteredProducts];

    if (sortOption === 'rating') {
      tempProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'discount') {
      tempProducts.sort((a, b) => b.discount - a.discount);
    } else if (sortOption === 'price') {
      tempProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(tempProducts);
  };

  const handleAddToCart = (product) => {
    if (product.stock < 50) {
      toast.warn('Hurry! Only a few items left.');
    }

    setCartItems((prevCartItems) => [...prevCartItems, product]);
    console.log('Added to cart:', product.name);
  };

  return (
    <div className='product-body'>
      <div>
        <label>Filter by brand:</label>
        <input
          type="text"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        />
      </div>
      <div>
        <label>Filter by category:</label>
        <input
          type="text"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>
      <div>
        <label>Sort by:</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">None</option>
          <option value="rating">Rating</option>
          <option value="discount">Discount</option>
          <option value="price">Price</option>
        </select>
      </div>
      <button onClick={filterProducts}>Apply Filters</button>
      <button onClick={sortProducts}>Sort Products</button>

      <div className="product-list-container">
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((product) => (
            <div className="product-item" key={product.id}>
              <h3>{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}</p>
              <p>Price: {product.price}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <hr />
            </div>
          ))}
      </div>

      <div className="cart-container">
        <h2>Cart</h2>

        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <p>{item.name}</p>
            <p>Brand: {item.brand}</p>
            <p>Category: {item.category}</p>
            <p>Rating: {item.rating}</p>
            <p>Discount: {item.discount}</p>
            <p>Price: {item.price}</p>
            <hr />
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductList;
