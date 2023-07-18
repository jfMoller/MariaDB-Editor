import { useRouteLoaderData } from "react-router-dom";

export default function RowDataList() {
  const rowData = useRouteLoaderData("rowData") as any;
  console.log(rowData);

  return (
    <div>
      <ul className="list-disc pl-6">
        {Object.entries(rowData).map(([key, value]) => (
          <li key={key} className="mb-2">
            <span className="font-bold">{key}: </span>
            {typeof value === "object" ? (
              <ul className="list-disc pl-6">
                {Object.entries(value).map(([nestedKey, nestedValue]) => (
                  <li key={nestedKey} className="mb-2">
                    <span className="font-bold">{nestedKey}: </span>
                    <span>{nestedValue}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span>{value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}