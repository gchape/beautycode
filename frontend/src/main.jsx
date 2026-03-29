import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Cart from "./features/cart/Cart";
import BrandEthos from "./features/footer/BrandEthos";
import Footer from "./features/footer/Footer";
import Hero from "./features/home/Hero";
import Home from "./features/home/Home";
import PrivacyPolicy from "./features/legal/PrivacyPolicy";
import TermsOfService from "./features/legal/TermsOfService";
import FeaturedProducts from "./features/product/FeaturedProducts";
import Products from "./features/product/Products";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route
          index
          element={
            <React.Fragment>
              <main>
                <Hero />
                <FeaturedProducts />
                <BrandEthos />
              </main>

              <Footer />
            </React.Fragment>
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route path="products" element={<Products />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
