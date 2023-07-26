import {
  useActionData,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import RowPage from "../row/RowPage";
import Foldout from "../components/Foldout";
import { useEffect, useState } from "react";
import ActionPopup from "../components/ActionPopup";

export default function TablePage() {
  const { table, rowID } = useParams();
  const navigate = useNavigate();

  const { databaseTitle, tableTitles } = useRouteLoaderData(
    "startingData"
  ) as any;

  useEffect(() => {
    !table && !rowID ? navigate(`/${tableTitles[0]}`) : null;
  }, []);

  const tableData = useRouteLoaderData("tableData") as any;
  const tableContent = tableData ? Object.keys(tableData[0]) : [];

  if (!tableData) {
    return null;
  }

  const actionData: any = useActionData();
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  console.log(actionData);

  useEffect(() => {
    if (actionData?.error) {
      setErrorMessage(true);
      setSuccessMessage(false);
    } else if (actionData?.success) {
      setSuccessMessage(true);
      setErrorMessage(false);
    }
  }, [actionData]);

  return (
    <main className="h-screen w-screen bg-gray-100">
      <Foldout
        title={"Row Data"}
        content={rowID ? <RowPage params={{ rowID }} /> : null}
        open={rowID !== undefined}
        onClose={() => {
          navigate(`/${table}`);
        }}
      />

      <header className="flex items-center justify-between bg-gray-900 py-4 px-6 min-h-100 max-h-100">
        <h1 className="text-2xl font-bold text-white">{databaseTitle}</h1>
        <nav className="flex space-x-4">
          {tableTitles.map((tableTitle) => (
            <a
              key={tableTitle}
              onClick={() => {
                navigate(`/${tableTitle}`);
              }}
              className="cursor-pointer text-white px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:bg-gray-700"
            >
              {tableTitle}
            </a>
          ))}
        </nav>
      </header>

      <ActionPopup
        content={
          errorMessage
            ? actionData?.error
            : successMessage
            ? actionData?.success
            : null
        }
        color={errorMessage ? "red" : successMessage ? "green" : null}
        open={errorMessage || successMessage}
        onClose={() => {
          if (errorMessage) {
            setErrorMessage(false);
          } else if (successMessage) {
            setSuccessMessage(false);
          }
        }}
      />

      <div className="flex flex-col justify-center items-center w-full h-full overflow-auto">
        <div className="w-screen overflow-x-auto">
          <table className="w-full text-gray-800 bg-white rounded-md shadow-md">
            <thead className="sticky top-0">
              <tr className="bg-gray-200">
                {tableContent.map((columnTitle) => (
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
              {tableData.map((columnTitle, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                  onClick={() => {
                    navigate(`/${table}/${columnTitle.id}`);
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
