import { Outlet } from "react-router";
import CrispChat from "../chat/CrispChat";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Home = () => (
  <div className="min-h-screen">
    <Navbar />
    <CrispChat />
    <Outlet />
    <Footer />
  </div>
);

export default Home;
