import { XMarkIcon } from "@heroicons/react/24/solid";

export default function XMarkButton(props: { handleClick: () => void, bg: string }) {
  return (
    <button
      type="button"
      className={"p-2 focus:outline-none "}
      onClick={props.handleClick}
    >
      <XMarkIcon
        className={"h-6 w-6 text-white rounded-md mr-[-0.5rem] " + props.bg}
        aria-hidden="true"
      />
    </button>
  );
}
