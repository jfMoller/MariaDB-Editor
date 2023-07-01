import { Outlet } from "react-router-dom";
import ExamplePage from "./ExamplePage";
import { exampleAPI } from "../network/exampleAPI";

export const weatherRoute = {
  id: "ExampleData",
  path: "/",
  element: <Outlet />,
  loader: async () => {
  const exampleData = await exampleAPI.getExampleData();
  const tables = await exampleAPI.getTableNames();
  return { exampleData, tables };
  },
  children: [{ index: true, element: <ExamplePage /> }],
};
