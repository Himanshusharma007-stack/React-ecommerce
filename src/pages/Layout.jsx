import { Navbar } from "../component/Navbar";
import { Footer } from "../component/Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
