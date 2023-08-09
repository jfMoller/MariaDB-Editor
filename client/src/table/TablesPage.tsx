import {
  useActionData,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import RowPage from "../row/RowPage";
import Foldout from "../components/Foldout";

import ActionPopup from "../components/ActionPopup";
import { useEffect, useState } from "react";
import TableHeaderMenu from "./components/TableHeaderMenu";
import DataTable from "./components/DataTable";
import QueryConsolePage from "../query/QueryConsolePage";

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

  //Handles visual feedback from actions, e.g. saving or deleting data rows
  const actionData: any = useActionData();
  let errorMessage = actionData?.error;
  let successMessage = actionData?.success;

  //handles tableData when requested as DDL (Data Definition Language)
  const [showQueryConsole, setShowQueryConsole] = useState<boolean>(false);
  let tableDDL = actionData?.tableAsDDL;

  if (!tableData) return null;
  else
    return (
      <main className="fixed h-screen w-screen bg-gray-900">
        <Foldout
          title={"Row Data"}
          maxWidth={"max-w-md"}
          content={rowID ? <RowPage key={`rowKey-${rowID}`} rowID={rowID} /> : null}
          open={rowID !== undefined}
          onClose={() => navigate(`/${database}/${table}`)}
        />

        <Foldout
          title={"Query Console"}
          maxWidth={"max-w-2xl"}
          content={showQueryConsole && tableDDL ? <QueryConsolePage tableDDL={tableDDL} /> : null}
          open={showQueryConsole && tableDDL != undefined}
          onClose={() => {setShowQueryConsole(false);}}
        />

        <TableHeaderMenu
          databaseTitle={databaseTitle}
          tableTitles={tableTitles}
          setShowQueryConsole={setShowQueryConsole}
          databaseSlug={database}
          tableSlug={table}
        />

        <ActionPopup
          content={errorMessage ? errorMessage : successMessage ? successMessage : null}
          variant={errorMessage ? "error" : successMessage ? "success" : null}
        />

        <div className="bg-gray-200 flex flex-col justify-start items-center w-full h-full overflow-auto">
          <div className="w-screen overflow-x-scroll pb-[4.66rem]">
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
