import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const RootRoute = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootRoute;
