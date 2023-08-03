import {
  useActionData,
  useNavigate,
  useParams,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import RowPage from "../row/RowPage";
import Foldout from "../components/Foldout";

import ActionPopup from "../components/ActionPopup";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "../utilities/capitalizeFirstLetter";

export default function TablePage() {
  const { database, table, rowID } = useParams();
  const navigate = useNavigate();
  const submit = useSubmit();

  const { databaseTitle, tableTitles } = useRouteLoaderData("titleData") as any;

  useEffect(() => {
    // Auto-select the first db table on render
    !table && !rowID ? navigate(`/${database}/${tableTitles[0]}`) : null;
  }, [table, rowID, navigate]);

  const tableData = useRouteLoaderData("tableData") as any;
  const tableContent = tableData ? Object.keys(tableData[0]) : [];

  if (!tableData) {
    return null;
  }

  // Handles visual feedback from actions, e.g. saving or deleting data rows
  const actionData: any = useActionData();
  let errorMessage = actionData?.error;
  let successMessage = actionData?.success;

  function handleDisconnect() {
    let formData = new FormData();
    formData.append("action", "disconnect-from-database");
    submit(formData, { method: "post" });
  }

  return (
    <main className="h-screen w-screen bg-gray-900">
      <Foldout
        title={"Row Data"}
        content={rowID ? <RowPage rowID={rowID} /> : null}
        open={rowID !== undefined}
        onClose={() => navigate(`/${database}/${table}`)}
      />

      <header className="relative flex items-center justify-between bg-gray-900 border-b border-b-gray-700 py-4 px-6 min-h-100 max-h-100">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white">{capitalizeFirstLetter(databaseTitle)}</h1>
          <button
            key={"disconnect"}
            onClick={handleDisconnect}
            className="cursor-pointer text-white px-4 py-2 ml-4 rounded-md bg-gray-700 hover:bg-gray-600 focus:bg-gray-700"
          >
            Disconnect
          </button>
        </div>
        <nav className="flex space-x-4">
          {tableTitles.map((tableTitle: string) => (
            <button
              key={tableTitle}
              onClick={() => {
                navigate(`/${database}/${tableTitle}`);
              }}
              className={`px-4 py-2 rounded-md ${table === tableTitle ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'} hover:bg-indigo-700 focus:bg-indigo-700`}
            >
              {capitalizeFirstLetter(tableTitle)}
            </button>
          ))}
        </nav>
      </header>

      <ActionPopup
        key={errorMessage || successMessage}
        content={ errorMessage ? errorMessage : successMessage ? successMessage : null }
        color={ errorMessage ? "red" : successMessage ? "green" : null }
      />

      <div className="flex flex-col justify-center items-center w-full h-full overflow-auto">
        <div className="w-screen overflow-x-auto">
          <table className="w-full text-black bg-gray-100 rounded-md shadow-md">
            <thead className="sticky top-0">
              <tr>
                {tableContent.map((columnTitle: string) => (
                  <th
                    key={columnTitle}
                    className="px-6 py-2 text-left bg-gray-300 font-bold uppercase"
                  >
                    {columnTitle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((rowData: any, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                  onClick={() => {
                    navigate(`/${database}/${table}/${rowData.id}`);
                  }}
                >
                  {tableContent.map((dataRow) => (
                    <td key={dataRow} className="px-6 py-4">
                      {rowData[dataRow]}
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
