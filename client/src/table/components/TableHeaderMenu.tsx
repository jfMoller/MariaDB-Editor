import { capitalizeFirstLetter } from "../../utilities/capitalizeFirstLetter";
import DisconnectButton from "./DisconnectButton";
import QueryButton from "../../query/components/QueryConsoleButton";
import { Dispatch } from "react";
import TableNavItems from "./TableNavItems";

export default function TableHeaderMenu(props: {
  databaseTitle: string;
  tableTitles: string[];
  setShowQueryConsole: Dispatch<React.SetStateAction<boolean>>;
  databaseSlug?: string;
  tableSlug?: string;
}) {
  return (
    <header className="sticky top-0 z-100 flex items-center justify-between bg-gray-900 border-b border-b-gray-700 py-4 px-6 min-h-100 max-h-100">
      <h1 className="text-2xl font-bold text-white">
        {capitalizeFirstLetter(props.databaseTitle)}
      </h1>

      <DisconnectButton />

      <div className={"flex flex-row overflow-x-auto"}>
        <QueryButton showQueryConsole={props.setShowQueryConsole} />
        <TableNavItems
          tableTitles={props.tableTitles}
          databaseSlug={props.databaseSlug}
          tableSlug={props.tableSlug}
        />
      </div>
    </header>
  );
}
