import { Outlet } from "react-router";
import CrispChat from "../chat/CrispChat";
import Navbar from "../navbar/Navbar";

const Home = () => (
  <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
    <Navbar />
    <CrispChat />

    <Outlet />
  </div>
);

export default Home;
