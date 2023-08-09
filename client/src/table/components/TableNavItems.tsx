import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utilities/capitalizeFirstLetter";

export default function TableNavItems(props: {
  tableTitles: string[];
  databaseSlug: string | undefined;
  tableSlug: string | undefined;
}) {
  const navigate = useNavigate();
  return (
    <div className="px-4 ml-4 border-l border-r border-l-gray-600 border-r-gray-600 overflow-x-auto ">
      <nav className="flex space-x-4">
        {props.tableTitles.map((tableTitle: string, index: number) => (
          <button
            key={`buttonKey${tableTitle}-${index}`}
            onClick={() => {
              navigate(`/${props.databaseSlug}/${tableTitle}`);
            }}
            className={`px-4 py-2 rounded-md text-white bg-gray-700 hover:bg-gray-600 ${
              props.tableSlug === tableTitle
                ? "border border-gray-400"
                : "text-gray-200"
            }`}
          >
            {capitalizeFirstLetter(tableTitle)}
          </button>
        ))}
      </nav>
    </div>
  );
}
