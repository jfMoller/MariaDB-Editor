import { Outlet, redirect } from "react-router-dom";
import { tableAPI } from "../network/tableAPI";
import { connectionAPI } from "../network/connectionAPI";
import { ProtectedRoute } from "../components/ProtectedRoute";
import TablesPage from "./TablesPage";
import { queryAPI } from "../network/queryAPI";

export const tablesRoutes = {
  id: "titleData",
  path: "/:database",
  element: (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  ),
  loader: async () => {
    const { databaseTitle, tableTitles, firstTable } =
      await tableAPI.getDatabaseAndTableTitles();
    return { databaseTitle, tableTitles, firstTable };
  },
  children: [
    { index: true, element: <TablesPage /> },
    {
      id: "tableData",
      element: <TablesPage />,
      path: "/:database/:table",
      //@ts-ignore
      loader: async ({ params }) => {
        const tableData = await tableAPI.getTableData(params.table);
        return tableData;
      },
      //@ts-ignore
      action: async ({ params, request }) => {
        const { action, data, rowID, query } = Object.fromEntries(await request.formData());

        if (action === "edit-row-data") {
          const editedData = JSON.parse(data);
          return await tableAPI.editRowData(params.table, editedData);
        }

        if (action === "delete-row-data") {
          return await tableAPI.deleteRowData(params.table, rowID);
        }

        if (action === "disconnect-from-database") {
          await connectionAPI.disconnectFromDatabase();
          return redirect("/");
        }

        if (action === "get-table-as-ddl") {
          return await tableAPI.getTableAsDDL(params.database, params.table);
        }

        if (action === "execute-sql-query") {
          return await queryAPI.executeQuery(query);
        }
      },
      children: [
        {
          id: "rowData",
          element: <TablesPage />,
          path: "/:database/:table/:rowID",
          //@ts-ignore
          loader: async ({ params }) => {
            const rowData = await tableAPI.getRowData(params.table, params.rowID);
            return rowData;
          }
        },
      ],
    },
  ],
};
