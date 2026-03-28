import BrandEthos from "../footer/BrandEthos";
import Footer from "../footer/Footer";
import BottomNavbar from "../navbar/BottonNavbar";
import TopNavbar from "../navbar/TopNavbar";
import FeaturedCollection from "./FeaturedCollection";
import Hero from "./Hero";

const Home = () => (
  <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
    <TopNavbar />
    <main>
      <Hero />
      <FeaturedCollection />
      <BrandEthos />
    </main>
    <Footer />
    <BottomNavbar />
  </div>
);

export default Home;
