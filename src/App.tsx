import { Outlet } from "react-router";
import Header from "./components/header/Header";
import NavBar from "./features/navigation/NavBar";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />
      {/* <TawkToChat /> */}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
