import { useNavigate } from "react-router-dom";

export default function DataTable(props: {
  tableData: any;
  columnTitles: any;
  databaseSlug?: string;
  tableSlug?: string;
}) {
  const navigate = useNavigate();

  return (
    <table className="w-full h-full text-black bg-gray-100 rounded-md shadow-md">
      <thead className="sticky top-0">
        <tr>
          {props.columnTitles.map((columnTitle: string) => (
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
        {props.tableData.map((rowData: any, index: number) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-200" : ""}
            onClick={() => {
              navigate(
                `/${props.databaseSlug}/${props.tableSlug}/${rowData.id}`
              );
            }}
          >
            {props.columnTitles.map((propertyName: string) => (
              <td key={propertyName} className="px-6 py-4">
                {rowData[propertyName]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
