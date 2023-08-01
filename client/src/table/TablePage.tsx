import {
  useActionData,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import RowPage from "../row/RowPage";
import Foldout from "../components/Foldout";
import { useEffect } from "react";
import ActionPopup from "../components/ActionPopup";

export default function TablePage() {
  const { database, table, rowID } = useParams();
  const navigate = useNavigate();

  //returns the db name and the names of its tables
  const { databaseTitle, tableTitles } = useRouteLoaderData(
    "titleData"
  ) as any;

  useEffect(() => {
    //auto-select the first db table on render
    !table && !rowID ? navigate(`/${database}/${tableTitles[0]}`) : null;
  }, [table, rowID, navigate]);

  const tableData = useRouteLoaderData("tableData") as any;
  const tableContent = tableData ? Object.keys(tableData[0]) : [];

  if (!tableData) {
    return null;
  }

  //handles visual feedback from actions, e.g saving or deleting data rows
  const actionData: any = useActionData();
  let errorMessage = actionData?.error;
  let successMessage = actionData?.success;

  return (
    <main className="h-screen w-screen bg-gray-100">

      <Foldout
        title={"Row Data"}
        content={rowID ? <RowPage params={{ rowID }} /> : null}
        open={rowID !== undefined}
        onClose={() => navigate(`/${database}/${table}`)} />

      <header className="flex items-center justify-between bg-gray-900 py-4 px-6 min-h-100 max-h-100">
        <h1 className="text-2xl font-bold text-white">{databaseTitle}</h1>
        <nav className="flex space-x-4">
          {tableTitles.map((tableTitle: string) => (
            <a
              key={tableTitle}
              onClick={() => {
                navigate(`/${database}/${tableTitle}`);
              }}
              className="cursor-pointer text-white px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:bg-gray-700"
            >
              {tableTitle}
            </a>
          ))}
        </nav>
      </header>

      <ActionPopup
        content={ errorMessage ? errorMessage : successMessage ? successMessage : null }
        color={ errorMessage ? "red" : successMessage ? "green" : null}
         />

      <div className="flex flex-col justify-center items-center w-full h-full overflow-auto">
        <div className="w-screen overflow-x-auto">
          <table className="w-full text-gray-800 bg-white rounded-md shadow-md">
            <thead className="sticky top-0">
              <tr className="bg-gray-200">
                {tableContent.map((columnTitle: string) => (
                  <th
                    key={columnTitle}
                    className="px-6 py-4 text-left font-bold uppercase"
                  >
                    {columnTitle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((columnTitle: string, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                  onClick={() => {
                    navigate(`/${database}/${table}/${columnTitle.id}`);
                  }}
                >
                  {tableContent.map((dataRow) => (
                    <td key={dataRow} className="px-6 py-4">
                      {columnTitle[dataRow]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
