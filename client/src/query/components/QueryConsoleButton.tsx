import { Dispatch } from "react";
import { useSubmit } from "react-router-dom";

export default function QueryConsoleButton(props: { showQueryConsole: Dispatch<React.SetStateAction<boolean>>}) {
    const submit = useSubmit();

    function handleQueryData() {
        let formData = new FormData();
        formData.append("action", "get-table-as-ddl");
        submit(formData, { method: "post" });
        props.showQueryConsole(true);
      }

  return (
    <button
      key={"query-console"}
      onClick={handleQueryData}
      className="cursor-pointer whitespace-nowrap text-white px-4 py-2 ml-4 rounded-md border bg-gray-800 border-gray-600 hover:bg-gray-700"
    >
      Query console
    </button>
  );
}
