import { XMarkIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler } from "react";

export default function (props: {
  content: { message: string; details: string | null } | null;
  color?: string | null;
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
}) {

  if (props.open) {
    return (
      <div className={"absolute z-10 w-screen py-4 px-6 flex flex-row items-start justify-between " + "bg-" + props.color + "-500" }>
        <div className="flex flex-col">
          <h2 className="font-bold">{props.content?.message}</h2>
          <p>{props.content?.details}</p>
        </div>
        <button
          type="button"
          className={"rounded-md focus:outline-none focus:ring-2 " + "hover:bg-" + props.color + "-300"}
          onClick={props.onClose}
        >
          <span className="sr-only">Close panel</span>
          <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
        </button>
      </div>
    );
  } else {
    return null;
  }
}
