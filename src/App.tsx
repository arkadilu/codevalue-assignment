// App.tsx
import React from "react";
import Toolbar from "./components/Toolbar";
import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";
import "./App.css"; // optional, for basic styling

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>My Store</h1>
      <div className="store-layout">
        <div className="sidebar">
          <Toolbar />
          <ProductsList />
        </div>
        <div className="details">
          <ProductDetails />
        </div>
      </div>
    </div>
  );
};

export default App;