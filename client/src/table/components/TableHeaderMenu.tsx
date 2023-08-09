import { useState } from "react";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utilities/capitalizeFirstLetter";
import DisconnectButton from "./DisconnectButton";
import QueryButton from "./QueryButton";
import Foldout from "../../components/Foldout";
import QueryPage from "../../query/QueryPage";

export default function TableHeaderMenu(
  props: { databaseTitle: string; tableTitles: string[], databaseSlug?: string, tableSlug?: string },
) {
  const navigate = useNavigate();
  const submit = useSubmit();
  const [isQueryOpen, setIsQueryOpen] = useState<boolean>(false);

  const actionData: any = useActionData();
  let tableAsSQL = actionData?.tableAsSQL;

  function handleQueryData() {
    let formData = new FormData();
    formData.append("action", "get-table-as-SQL");
    submit(formData, { method: "post" });
    //setIsQueryOpen(true);
  }

  return (<>
    <header className="sticky top-0 z-100 flex items-center justify-between bg-gray-900 border-b border-b-gray-700 py-4 px-6 min-h-100 max-h-100">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-white">
          {capitalizeFirstLetter(props.databaseTitle)}
        </h1>
        <DisconnectButton />
        <QueryButton handleClick={handleQueryData} />
      </div>
      <div className="px-4 ml-4 border-l border-r border-l-gray-600 border-r-gray-600 overflow-x-auto ">
        <nav className="flex space-x-4">
          {props.tableTitles.map((tableTitle: string, index: number) => (
            <button
            key={`buttonKey${tableTitle}-${index}`}
              onClick={() => {
                navigate(`/${props.databaseSlug}/${tableTitle}`);
              }}
              className={`px-4 py-2 rounded-md text-white bg-gray-700 hover:bg-gray-600 ${
                props.tableSlug === tableTitle ? "border border-gray-400" : "text-gray-200"
              }`}
            >
              {capitalizeFirstLetter(tableTitle)}
            </button>
          ))}
        </nav>
      </div>
    </header>

    <Foldout
          title={"Query Console"}
          content={tableAsSQL ? <QueryPage data={tableAsSQL} /> : null}
          open={tableAsSQL !== undefined}
          onClose={() => {setIsQueryOpen(false);}}
        />
  </>);
}
