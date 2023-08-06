import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { connectionRoutes } from "./connection/ConnectionRoutes";
import { tablesRoutes } from "./table/TablesRoutes";
import { AuthenticationProvider } from "./network/AuthenticationProvider";

export const routes = [connectionRoutes, tablesRoutes];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <RouterProvider router={router} />
    </AuthenticationProvider>
  </React.StrictMode>
);
