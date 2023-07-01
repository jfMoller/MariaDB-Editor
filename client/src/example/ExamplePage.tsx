import { useRouteLoaderData } from "react-router-dom";

export default function ExamplePage() {
  const data = useRouteLoaderData("ExampleData");
  const { exampleData, tables } = data;

  const tableNames = tables.map((table) => table);
  const dataColumns = exampleData.length > 0 ? Object.keys(exampleData[0]) : [];

  return (
    <main className="h-screen w-screen bg-black">
      <header className="flex items-center justify-between bg-gray-900 py-4 px-6">
        <h1 className="text-2xl font-bold text-white">homenet 2023</h1>
        <nav className="flex space-x-4">
          {tableNames.map((tableName) => (
            <a
              key={tableName}
              href={`/${tableName}`}
              className="text-white px-6 py-3 bg-gray-900"
            >
              {tableName}
            </a>
          ))}
        </nav>
      </header>
      <div className="flex flex-col justify-center items-center w-screen h-screen overflow-auto">
        <div className="max-w-full overflow-x-auto">
          <table className="w-screen text-white bg-gray-800 rounded-md border border-gray-600 p-10">
            <thead className="sticky top-0 border border-gray-600">
              <tr>
                {dataColumns.map((propertyName) => (
                  <th key={propertyName} className="px-6 py-3 bg-gray-900">
                    {propertyName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exampleData.map((example, index) => (
                <tr key={index}>
                  {dataColumns.map((propertyName) => (
                    <td key={propertyName} className="px-6 py-4">
                      {example[propertyName]}
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
