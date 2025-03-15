// ProductList.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProductItem from "../components/Product";

const ProductList: React.FC = () => {
    const { items, searchTerm, sortBy } = useSelector(
        (state: RootState) => state.products
    );

    const filtered = items.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else { // "creationDate"
            return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        }
    });

    return (
        <div>
            {sorted.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}

            <div style={{ marginTop: "8px" }}>
                <button onClick={()=>{}}>Prev Page</button>
                <button onClick={()=>{}}>Next Page</button>
            </div>
        </div>
    );
};

export default ProductList;