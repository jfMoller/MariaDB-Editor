export default function QueryButton(props: { handleClick: () => void }) {

  return (
    <button
      key={"query-console"}
      onClick={props.handleClick}
      className="cursor-pointer text-white px-4 py-2 ml-4 rounded-md border border-gray-300 hover:bg-gray-700"
    >
      Query
    </button>
  );
}
