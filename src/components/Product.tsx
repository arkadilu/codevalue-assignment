// ProductItem.tsx
import React from "react";
import { useDispatch } from "react-redux";
import {
  Product,
  deleteProduct,
  setSelectedProductId,
} from "../store/productsReducer";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  // When clicked, set this product as selected
  const handleSelect = () => {
    dispatch(setSelectedProductId(product.id));
  };

  // Prevent the parent onClick if we press "Delete"
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  };

  return (
    <div
      className="product-item"
      style={{
        border: "1px solid #ddd",
        padding: "8px",
        margin: "4px 0",
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      onClick={handleSelect}
    >
      <div>
        <strong>{product.name}</strong>
        <div style={{ fontSize: "0.9em" }}>{product.description}</div>
      </div>
      <button
        onClick={handleDelete}
        style={{ backgroundColor: "#f00", color: "#fff" }}
      >
        Delete
      </button>
    </div>
  );
};

export default ProductItem;