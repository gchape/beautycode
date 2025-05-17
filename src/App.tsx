import { Outlet } from "react-router";
import Header from "./features/header/Header";
import NavBar from "./features/navigation/NavBar";

import "./App.css";

export default function App() {
  return (
    <main>
      <Header />
      <NavBar />

      <Outlet />
    </main>
  );
}
