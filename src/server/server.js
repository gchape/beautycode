import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import products from "./data/products.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const hostname = process.env.SERVER_HOSTNAME || "localhost";

app.use(cors());

app.get("/api/products", (request, response) => {
  response.json(products);
});

app.get("/api/products/:category", (request, response) => {
  const param = request.params.category;

  response.json(products.filter((p) => p.category === param));
});

app.listen(Number(PORT), () => {
  console.log(`Server is running at http://${hostname}:${PORT}`);
});
