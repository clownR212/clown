import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ClownPage from "./pages/ClownPage";
import MiniClownPage from "./pages/MiniClownPage";
import Register from "./pages/Register";
import FormatClown from "./pages/FormatClown";
import FormatMiniClown from "./pages/FormatMiniClown";
import "./index.css";
import { clownData, miniClownData } from "./data/competitions";
import Phase1ResultsPage from "./pages/OldResultsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <ClownPage data={clownData} /> },
        { path: "clown", element: <ClownPage data={clownData} /> },
        // { path: "miniclown", element: <MiniClownPage data={miniClownData} /> },
        // { path: "inscription", element: <Register /> },
        { path: "format-clown", element: <FormatClown /> },
        { path: "phase-results", element: <Phase1ResultsPage /> },

        // { path: "format-miniclown", element: <FormatMiniClown /> },
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
