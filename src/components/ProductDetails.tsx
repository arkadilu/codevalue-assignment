// ProductDetails.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Product,
  addEditProduct,
  initialProductState,
} from "../store/productsReducer";
import { RootState } from "../store/store";
import reactLogo from "../assets/react.svg"; // Import the SVG image

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { items, selectedProductId } = useSelector((state: RootState) => state.products);

  // If null then we are adding a new product
  const existingProduct = items.find((p) => p.id === selectedProductId);

  // Local form state
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [createdDate, setCreatedDate] = useState("");

  // On selection change, fill local state
  useEffect(() => {
    if (existingProduct) {
      setId(existingProduct.id);
      setName(existingProduct.name);
      setDescription(existingProduct.description || "");
      setPrice(existingProduct.price);
      setCreatedDate(existingProduct.createdDate);
    } else {
      // new product
      const newProd = initialProductState();
      setId(newProd.id);
      setName(newProd.name);
      setDescription(newProd.description || "");
      setPrice(newProd.price);
      setCreatedDate(newProd.createdDate);
    }
  }, [existingProduct]);

  // Simple validation
  const isNameValid = name.trim().length > 0;
  const isPriceValid = price > 0;
  const isFormValid = isNameValid && isPriceValid;

  // Dispatch add/edit
  const handleSave = () => {
    if (!isFormValid) return;
    const newProduct: Product = {
      id,
      name,
      description,
      price,
      createdDate,
    };
    dispatch(addEditProduct(newProduct));
  };

  console.log('existingProduct', existingProduct);
  console.log('selectedProductId', selectedProductId);

  // If no product is selected and not adding a new one, show a placeholder
  if (!existingProduct && selectedProductId !== null) {
    return <div>Please select or add a product.</div>;
  }

  return (
    <div style={{ padding: "8px" }}>
      <h2>Product Details</h2>
      <img src={reactLogo} alt="Product" width={150} height={150} />
      {/* <div style={{ marginTop: "8px" }}>
        <label>ID:</label>
        <input
          type="text"
          value={id||""}
          disabled={!!existingProduct}
          onChange={(e) => setId(e.target.value)}
        />
      </div> */}
      <div style={{ marginTop: "8px" }}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!isNameValid && <div style={{ color: "red" }}>Name is required.</div>}
      </div>
      <div style={{ marginTop: "8px" }}>
        <label>Description: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "8px" }}>
        <label>Price: </label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        {!isPriceValid && <div style={{ color: "red" }}>Price must be &gt; 0.</div>}
      </div>
      <div style={{ marginTop: "8px" }}>
        <label>Created Date: </label>
        <input
          type="date"
          value={createdDate.slice(0, 10)} // e.g. "2025-03-13"
          onChange={(e) =>
            setCreatedDate(
              new Date(e.target.value).toISOString() // store in ISO format
            )
          }
        />
      </div>
      <button
        onClick={handleSave}
        disabled={!isFormValid}
        style={{ marginTop: "12px" }}
      >
        Save
      </button>
    </div>
  );
};

export default ProductDetails;