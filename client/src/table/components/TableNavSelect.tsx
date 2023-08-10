import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TableNavSelect(props: {
  tableTitles: string[];
  databaseSlug: string | undefined;
  tableSlug: string | undefined;
}) {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(props.tableSlug);

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const newSelectedTable = event.target.value;
    navigate(`/${props.databaseSlug}/${newSelectedTable}`);
    setSelectedTable(newSelectedTable);
  }

  return (
    <select
      key={"select"}
      className="min-h-11 max-h-11 px-4 py-3 border border-gray-300 rounded-md text-white bg-gray-700"
      onChange={handleSelectChange}
      defaultValue={selectedTable}
    >
      {props.tableTitles.map((tableTitle: string, index: number) => (
        <option key={index} value={tableTitle}>
          {tableTitle}
        </option>
      ))}
    </select>
  );
}
