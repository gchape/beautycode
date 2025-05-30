import { Outlet } from "react-router";
import Header from "./components/header/Header";
import NavBar from "./features/navigation/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Container } from "react-bootstrap";
import "./App.css";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Container fluid className="d-flex flex-column vw-100 vh-100 p-0 m-0">
        <Header />
        <NavBar />

        {/* <TawkToChat /> */}
        <div className="d-flex flex-grow-1 p-0 m-0">
          <Outlet />
        </div>
      </Container>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
