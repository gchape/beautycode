import { Outlet } from "react-router";
import Header from "./components/header/Header";
import NavBar from "./components/navigation/NavBar";

import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <NavBar />

      <Outlet />
    </>
  );
}
