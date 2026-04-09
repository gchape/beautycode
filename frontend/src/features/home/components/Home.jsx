import { Outlet } from "react-router";
import { Footer } from "src/features/footer";
import { Navbar } from "src/features/navbar";
import CrispChat from "../../chat/CrispChat";

const Home = () => (
  <div className="min-h-screen">
    <Navbar />
    <CrispChat />
    <Outlet />
    <Footer />
  </div>
);

export default Home;
