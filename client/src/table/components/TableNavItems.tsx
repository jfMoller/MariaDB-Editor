import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TableNavButton from "./TableNavButton";
import TableNavSelect from "./TableNavSelect";

export default function TableNavItems(props: {
  tableTitles: string[];
  databaseSlug: string | undefined;
  tableSlug: string | undefined;
}) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  //determines when tableTitles should be rendered as a dropdown
  function handleResize() {
    if (window.innerWidth < props.tableTitles.length * 100) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="px-4 ml-4 border-l border-r border-l-gray-600 border-r-gray-600 overflow-x-auto">
      {showDropdown ? (
        <div className={"relative"}>
          <TableNavSelect
            tableTitles={props.tableTitles}
            databaseSlug={props.databaseSlug}
            tableSlug={props.tableSlug}
          />
        </div>
      ) : (
        <div className={"flex flex-nowrap space-x-4 relative"}>
          {props.tableTitles.map((tableTitle: string, index: number) => (
            <TableNavButton
              key={`navKey-${tableTitle}-${index}`}
              tableTitle={tableTitle}
              handleClick={() =>
                navigate(`/${props.databaseSlug}/${tableTitle}`)
              }
              tableSlug={props.tableSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
