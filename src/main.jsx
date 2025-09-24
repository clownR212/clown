import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ClownPage from "./pages/ClownPage";
import MiniClownPage from "./pages/MiniClownPage";
import Register from "./pages/Register";
import Format from "./pages/Format";
import "./index.css";
import { clownData, miniClownData } from "./data/competitions";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element:<ClownPage data={clownData} /> },
        { path: "clown", element: <ClownPage data={clownData} /> },
        { path: "miniclown", element:<MiniClownPage data={miniClownData} /> },
        { path: "inscription", element: <Register /> },
        { path: "format", element: <Format /> }

      ],
    },
  ],
  { basename: import.meta.env.BASE_URL } 
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
