import { Outlet } from "react-router";
import CrispChat from "../chat/CrispChat";
import Navbar from "../navbar/Navbar";

const Home = () => (
  <div className="bg-background min-h-screen">
    <Navbar />
    <CrispChat />

    <Outlet />
  </div>
);

export default Home;
