import {
  useActionData,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import RowPage from "../row/RowPage";
import Foldout from "../components/Foldout";

import ActionPopup from "../components/ActionPopup";
import { useEffect } from "react";
import TableHeaderMenu from "./components/TableHeaderMenu";
import DataTable from "./components/DataTable";

export default function TablePage() {
  const { database, table, rowID } = useParams();
  const navigate = useNavigate();

  const { databaseTitle, tableTitles, firstTable } = useRouteLoaderData(
    "titleData"
  ) as any;

  useEffect(() => {
    navigate(`/${database}/${firstTable}`);
  }, []);

  const tableData = useRouteLoaderData("tableData") as any;
  const columnTitles = tableData ? Object.keys(tableData[0]) : [];

  // Handles visual feedback from actions, e.g. saving or deleting data rows
  const actionData: any = useActionData();
  let errorMessage = actionData?.error;
  let successMessage = actionData?.success;

  if (!tableData) return null;
  else
    return (
      <main className="relative h-screen w-screen bg-gray-900">
        <Foldout
          title={"Row Data"}
          content={rowID ? <RowPage rowID={rowID} /> : null}
          open={rowID !== undefined}
          onClose={() => navigate(`/${database}/${table}`)}
        />

        <TableHeaderMenu
          databaseTitle={databaseTitle}
          tableTitles={tableTitles}
          databaseSlug={database}
          tableSlug={table}
        />

        <ActionPopup
          content={errorMessage ? errorMessage : successMessage ? successMessage : null}
          variant={errorMessage ? "error" : successMessage ? "success" : null}
        />

        <div className="relative bg-gray-200 flex flex-col justify-start items-center w-full h-full overflow-auto">
          <div className="w-screen flex overflow-x-scroll">
            <DataTable
              tableData={tableData}
              columnTitles={columnTitles}
              databaseSlug={database}
              tableSlug={table}
            />
          </div>
        </div>
      </main>
    );
}
