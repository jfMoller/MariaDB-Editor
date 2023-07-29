import { XMarkIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler } from "react";

export default function ActionPopup(props: {
  content: { message: string; details: string | null } | null;
  color?: string | null;
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
}) {
  const { open, onClose } = props;

  return (
    <div
      className={`absolute z-10 w-screen py-4 px-6 flex flex-row items-start justify-between bg-${props.color}-500 ${
        open ? "opacity-100 h-auto" : "opacity-0 h-0 pointer-events-none"
      } transition-opacity transition-height duration-300 ease-in-out overflow-hidden`}
    >
      <div className="flex flex-col">
        <h2 className="font-bold">{props.content?.message}</h2>
        <p>{props.content?.details}</p>
      </div>
      <button
        type="button"
        className={`rounded-md focus:outline-none focus:ring-2 hover:bg-${props.color}-300`}
        onClick={onClose}
      >
        <span className="sr-only">Close panel</span>
        <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
      </button>
    </div>
  );
}