export default function Button(props: {
  text: string;
  color: string;
  className?: string | null;
  handleClick: () => void;
}) {
  const colorClass = `bg-${props.color}-600 ` + `focus-${props.color}-600 `;
  const additionalClass = props.className;

  return (
    <button
    type="button"
    className={"w-full inline-flex justify-center rounded-md ml-4 hover:border-white shadow-sm px-4 py-2 text-base font-medium text-white sm:w-auto sm:text-sm " + colorClass + additionalClass}
    onClick={props.handleClick}
  >
    {props.text}
  </button>
  );
}
