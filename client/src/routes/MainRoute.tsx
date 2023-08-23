import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Shopping from "../pages/Shopping";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
    </>
  );
};

export default MainRoute;
