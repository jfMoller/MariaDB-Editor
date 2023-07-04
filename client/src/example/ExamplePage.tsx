import { useEffect } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";

export default function ExamplePage() {
  const { databaseTitle, tableTitles } = useRouteLoaderData(
    "startingData"
  ) as any;

  const tableData = useRouteLoaderData("tableData") as any;
  const tableContent = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const { table } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      //auto the first table in the database on render
      navigate(`/${tableTitles[0]}`);
  }, [tableTitles]);

  return (
    <main className="h-screen w-screen bg-gray-100">
      <header className="sticky top-0 flex items-center justify-between bg-gray-900 py-4 px-6">
        <h1 className="text-2xl font-bold text-white">{databaseTitle}</h1>
        <nav className="flex space-x-4">
          {tableTitles.map((tableTitle) => (
            <a
              key={tableTitle}
              onClick={() => {
                navigate(`/${tableTitle}`);
              }}
              className="text-white px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:bg-gray-700"
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
