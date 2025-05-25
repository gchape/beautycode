import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import products from "./data/products.js";
import { mute } from "@cloudinary/url-gen/qualifiers/volume";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const hostname = process.env.SERVER_HOSTNAME || "localhost";

app.use(cors());

app.get("/api/products", async (req, resp) => {
  const category = req.query.category;

  await new Promise((resolve) => setTimeout(resolve, 5_000));

  if (category) {
    const categoryProducts = products.filter(
      (product) => product.category === category
    );

    resp.json(categoryProducts);
  } else resp.json(products);
});

app.listen(Number(PORT), () => {
  console.log(`Server is running at http://${hostname}:${PORT}`);
});
