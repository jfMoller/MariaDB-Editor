import { useRouteLoaderData } from "react-router-dom";

export default function ExamplePage() {
  const exampleData = useRouteLoaderData("ExampleData");
  console.log(exampleData);

  return (
    <main className="h-screen w-screen bg-black">
      <div className="flex flex-col justify-center items-center w-screen h-screen overflow-auto">
        <div className="max-w-full overflow-x-auto">
          <table className="w-screen text-white bg-gray-800 rounded-md border border-gray-600 p-10">
            <thead className="sticky top-0 border border-gray-600">
              <tr>
                <th className="px-6 py-3 bg-gray-900">ID</th>
                <th className="px-6 py-3 bg-gray-900">Gatuadress</th>
              </tr>
            </thead>
            <tbody>
              {exampleData.map((example) => (
                <tr key={example.id}>
                  <td className="px-6 py-4">{example.id}</td>
                  <td className="px-6 py-4">{example.gatuadress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}