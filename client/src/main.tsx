import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { connectionRoutes } from "./connection/ConnectionRoutes";
import { tableRoutes } from "./table/TableRoutes";

export const routes = [connectionRoutes, tableRoutes];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
