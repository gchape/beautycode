import { Outlet, useLocation } from "react-router";
import CrispChat from "../chat/CrispChat";
import BrandEthos from "../footer/BrandEthos";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import FeaturedProducts from "../product/FeaturedProducts";
import Hero from "./Hero";

const Home = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Navbar />
      <CrispChat />

      {pathname !== "/" ? (
        <Outlet />
      ) : (
        <>
          <main>
            <Hero />
            <FeaturedProducts />
            <BrandEthos />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
