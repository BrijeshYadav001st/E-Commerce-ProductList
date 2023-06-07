import React from 'react';
import ProductList from './Components/ProductList';

const App = () => {
  return (
    <div
    >
      <h1 style={{
        display: "flex",
        justifyContent: "center",
        color: "#0020C2"
        }}>Product Listing Page</h1>
        <p
        style={{
          display: "flex",
          justifyContent: "center",
          color: "red"
          }}
        >
          *** Add Items , you are able to see on buttom.
        </p>
      <ProductList />
    </div>
  );
};

export default App;
