import { useState } from "react";
import { CategoryContext } from "./categoryContext";

const CategoryProvider = ({ children }) => {
  const [productCategory, setProductCategory] = useState("all");

  return (
    <CategoryContext.Provider value={[productCategory, setProductCategory]}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
