import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string| null;
  name: string;
  description?: string;
  price: number;
  createdDate: string;
}

export const initialProductState: () => Product = () => {
  const initProduct: Product = {
    id: null,
    name: "",
    description: "",
    price: 0,
    createdDate: "",
  };
  return initProduct;
};

interface ProductState {
  items: Product[];
  selectedProductId: number | null;
  searchTerm: string;
  sortBy: "name" | "creationDate";
  sortOptions: string[];
  currentPage: number;
  totalPages: number;
}

/* */
function loadFromLocalStorage(): Product[] {
  try {
    const data = localStorage.getItem("product-management-app-items");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn("Failed to load products from localStorage:", e);
    return [];
  }
}

function saveToLocalStorage(products: Product[]) {
  try {
    localStorage.setItem(
      "product-management-app-items",
      JSON.stringify(products)
    );
  } catch (e) {
    console.warn("Failed to save products to localStorage:", e);
  }
}
const savedProducts = loadFromLocalStorage();

const initialItems: Product[] = savedProducts.length
  ? savedProducts
  : [
      {
        id: '1',
        name: "Product 1",
        description: "Product 1 description",
        price: 100,
        createdDate: new Date("2025-03-12").toISOString(),
      },
      {
        id: '2',
        name: "Product 2",
        description: "Product 2 description",
        price: 120,
        createdDate: new Date("2025-03-13").toISOString(),
      },
      {
        id: '3',
        name: "Product 3",
        description: "Product 3 description",
        price: 100,
        createdDate: new Date("2025-03-13").toISOString(),
      },
      {
        id: '4',
        name: "Product 4",
        description: "Product 4 description",
        price: 120,
        createdDate: new Date("2025-03-14").toISOString(),
      },
      {
        id: '5',
        name: "Product 5",
        description: "Product 5 description",
        price: 100,
        createdDate: new Date("2025-03-14").toISOString(),
      },
      {
        id: '6',
        name: "Product 6",
        description: "Product 6 description",
        price: 120,
        createdDate: new Date("2025-03-15").toISOString(),
      },
    ];
/* */

const initialState: ProductState = {
  items: initialItems,
  selectedProductId: null,
  searchTerm: "",
  sortBy: "name",
  sortOptions: ["name", "creationDate"],
  currentPage: 1,
  totalPages: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProductId(state, action: PayloadAction<number | null>) {
      state.selectedProductId = action.payload;
    },
    addEditProduct(state, action: PayloadAction<Product>) {
      const pIndex = state.items.findIndex((p) => p.id === action.payload.id);
      if (pIndex < 0) state.items.push(action.payload);
      else state.items.splice(pIndex, 1, action.payload);
      saveToLocalStorage(state.items);
    },
    deleteProduct(state, action: PayloadAction<string>) {
      const pIndex = state.items.findIndex((p) => p.id === action.payload);
      state.items.splice(pIndex, 1);
      saveToLocalStorage(state.items);
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSortBy(state, action: PayloadAction<"name" | "creationDate">) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSelectedProductId, addEditProduct, deleteProduct, setSearchTerm, setSortBy } =
  productsSlice.actions;
export default productsSlice.reducer;
