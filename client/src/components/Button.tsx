export default function Button(props: {
  text: string;
  color: string;
  handleClick: () => void;
}) {
  const colorClass = `bg-${props.color}-600 ` + `focus-${props.color}-600 `;

  return (
    <button
    type="button"
    className={"w-full inline-flex justify-center rounded-md border border-gray-300 hover:border-white shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm " + colorClass}
    onClick={props.handleClick}
  >
    {props.text}
  </button>
  );
}
