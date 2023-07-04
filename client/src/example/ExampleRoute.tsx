import { Outlet } from "react-router-dom";
import ExamplePage from "./ExamplePage";
import { exampleAPI } from "../network/exampleAPI";

export const weatherRoute = {
  id: "startingData",
  path: "/",
  element: <Outlet />,
  loader: async () => {
    const { databaseTitle, tableTitles } = await exampleAPI.getTableNames();
    return { databaseTitle, tableTitles };
  },
  children: [
    { index: true, element: <ExamplePage /> },
    {
      id: "tableData",
      element: <ExamplePage />,
      path: "/:table",
      //@ts-ignore
      loader: async ({ params }) => exampleAPI.getTableData(params.table)
    },
  ],
};
