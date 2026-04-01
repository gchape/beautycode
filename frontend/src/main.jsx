import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Cart from "./features/cart/Cart";
import BrandEthos from "./features/home/BrandEthos";
import Hero from "./features/home/Hero";
import Home from "./features/home/Home";
import PrivacyPolicy from "./features/legal/PrivacyPolicy";
import TermsOfService from "./features/legal/TermsOfService";
import FeaturedProducts from "./features/product/FeaturedProducts";
import ProductsCatalog from "./features/product/ProductsCatalog";
import Profile from "./features/profile/Profile";
import CartContextStateProvider from "./features/state/CartContextProvider";
import LoginContextProvider from "./features/state/LoginContextProvider";
import ProductCategoryProvider from "./features/state/ProductCategoryProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <CartContextStateProvider>
    <ProductCategoryProvider>
      <LoginContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route
                index
                element={
                  <main>
                    <Hero />
                    <FeaturedProducts />
                    <BrandEthos />
                  </main>
                }
              />
              <Route path="cart" element={<Cart />} />
              <Route path="profile" element={<Profile />} />
              <Route path="products" element={<ProductsCatalog />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginContextProvider>
    </ProductCategoryProvider>
  </CartContextStateProvider>,
);
