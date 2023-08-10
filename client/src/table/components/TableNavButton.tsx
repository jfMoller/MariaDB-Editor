export default function TableNavButton(
  props: { tableTitle: string; handleClick: () => void, tableSlug: string | undefined },
) {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white bg-gray-700 hover:bg-gray-600 ${
        props.tableTitle === props.tableSlug
          ? "border border-gray-400"
          : "text-gray-200"
      }`}
      onClick={props.handleClick}
    >
      {props.tableTitle}
    </button>
  );
}
