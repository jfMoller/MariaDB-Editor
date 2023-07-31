import { Outlet } from "react-router-dom";
import TablePage from "./TablePage";
import { tableAPI } from "../network/tableAPI";

export const tableRoute = {
  id: "titleData",
  path: "/:database",
  element: <Outlet />,
  loader: async () => {
    const { databaseTitle, tableTitles } = await tableAPI.getTableNames();
    return { databaseTitle, tableTitles };
  },
  children: [
    { index: true, 
      element: <TablePage />,
    },
    {
      id: "tableData",
      element: <TablePage />,
      path: "/:database/:table",
      //@ts-ignore
      loader: async ({ params }) => tableAPI.getTableData(params.table),
      //@ts-ignore
      action: async ({ params, request }) => {
        const row = Object.fromEntries(await request.formData());

        if (row.action === "edit-row-data") {
          const editedData = JSON.parse(row.data)
            return await tableAPI.editRowData(params.table, editedData)
        }

        else if (row.action === "delete-row-data") {
          try {
            return await tableAPI.deleteRowData(params.table, row.rowID);
          }
          catch (error) {
            return `Failed to delete row: ${error}`;
          }
        }

      },
      children: [
        {
          id: "rowData",
          element: <TablePage />,
          path: "/:database/:table/:rowID",
          //@ts-ignore
          loader: async ({ params }) =>
            tableAPI.getRowData(params.table, params.rowID),
        },
      ],
    },
  ],
};
