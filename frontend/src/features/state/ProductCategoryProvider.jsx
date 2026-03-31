import { useState } from "react";
import { ProductCategoryContext } from "./store";

const ProductCategoryProvider = ({ children }) => {
  const [productCategory, setProductCategory] = useState("all");

  return (
    <ProductCategoryContext.Provider
      value={[productCategory, setProductCategory]}
    >
      {children}
    </ProductCategoryContext.Provider>
  );
};

export default ProductCategoryProvider;
