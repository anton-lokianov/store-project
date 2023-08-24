import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Shopping from "../pages/Shopping";
import RootLayout from "./RootLayout";
import Page404 from "../pages/Page404";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shopping",
        element: <Shopping />,
      },
    ],
  },
]);
