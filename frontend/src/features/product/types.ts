import type { Dispatch, SetStateAction } from "react";

export type { ProductCard, Product } from "src/types";
export type CategoryValue = string;

export type CategoryContextValue = [
  CategoryValue,
  Dispatch<SetStateAction<CategoryValue>>,
];
