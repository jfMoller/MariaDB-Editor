import { Outlet } from "react-router-dom";
import TablePage from "./TablePage";
import { tableAPI } from "../network/tableAPI";
import RowPage from "../row/RowPage";

export const tableRoute = {
  id: "startingData",
  path: "/",
  element: <Outlet />,
  loader: async () => {
    const { databaseTitle, tableTitles } = await tableAPI.getTableNames();
    return { databaseTitle, tableTitles };
  },
  children: [
    { index: true, element: <TablePage /> },
    {
      id: "tableData",
      element: <TablePage />,
      path: "/:table",
      //@ts-ignore
      loader: async ({ params }) => await tableAPI.getTableData(params.table),
      children: [
        {
          id: "rowData",
          element: <RowPage />,
          path: "/:table/:rowID",
          //@ts-ignore
          loader: async ({ params }) =>
            tableAPI.getRowData(params.table, params.rowID),
        },
      ],
    },
  ],
};
