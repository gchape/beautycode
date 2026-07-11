import { Outlet } from "react-router";
import { SiteFooter } from "src/ui/footer/SiteFooter";
import { SiteHeader } from "src/ui/navbar/SiteHeader";
import { CrispChat } from "./CrispChat";

export const Root = () => (
  <div className="min-h-screen">
    <SiteHeader />
    <CrispChat />
    <Outlet />
    <SiteFooter />
  </div>
);
