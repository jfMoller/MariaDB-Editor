import { Outlet } from "react-router-dom";
import ExamplePage from "./ExamplePage";
import { exampleAPI } from "../network/exampleAPI";

export const weatherRoute = {
  id: "ExampleData",
  path: "/",
  element: <Outlet />,
  loader: async () => exampleAPI.getExampleData(),
  children: [{ index: true, element: <ExamplePage /> }],
};
