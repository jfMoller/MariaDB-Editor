import { useNavigate } from "react-router-dom";

export default function DataTable(props: {
  tableData: any;
  columnTitles: any;
  databaseSlug?: string;
  tableSlug?: string;
}) {
  const navigate = useNavigate();

  return (
    <table className="w-full text-black bg-gray-100">
      <thead className="sticky top-0">
        <tr>
          {props.columnTitles.map((columnTitle: string, index: number) => (
            <th
            key={`trKey${columnTitle}-${index}`}
              className="px-6 py-2 text-left text-white bg-gray-800 font-bold"
            >
              {columnTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.tableData.map((rowData: any, index: number) => (
          <tr
          key={`trKey${rowData}-${index}`}
            className={index % 2 === 0 ? "bg-gray-200" : ""}
            onClick={() => {
              navigate(
                `/${props.databaseSlug}/${props.tableSlug}/${rowData.id}`
              );
            }}
          >
            {props.columnTitles.map((propertyName: string, index: number) => (
              <td key={`tdKey${propertyName}-${index}`} className="px-6 py-4">
                {rowData[propertyName]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
