import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import RowPage from "../row/RowPage";
import Foldout from "../components/Foldout";
import { useEffect } from "react";

export default function TablePage() {
  const { table, rowID } = useParams();
  const navigate = useNavigate();

  const { databaseTitle, tableTitles } = useRouteLoaderData(
    "startingData"
  ) as any;

  useEffect(() => {
    navigate(`/${tableTitles[0]}`);
  }, []);

  const tableData = useRouteLoaderData("tableData") as any;
  const tableContent = tableData ? Object.keys(tableData[0]) : [];

  const rowData = useRouteLoaderData("rowData") as any;
  console.log(rowData)

  if (tableData) {
    return (
      <main className="h-screen w-screen bg-gray-100">
        <Foldout
          title={"Display row"}
          content={rowID ? <RowPage /> : null}
          open={rowID !== undefined}
          onClose={() => {
            navigate(`/events/${table}`);
          }}
        />

        <header className="sticky top-0 flex items-center justify-between bg-gray-900 py-4 px-6">
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
}
