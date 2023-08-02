import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function ActionPopup(props: {
  content: { message: string; details: string | null; } | null;
  color?: string | null;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(!!props.content);
  }, [props.content]);

  if (isOpen && props.content) {
    return (
      <div
        className={`absolute z-10 w-full py-4 px-6 flex flex-row items-start justify-between bg-${
          props.color
        }-500 ${
          isOpen ? "opacity-100 h-auto" : "opacity-0 h-0 pointer-events-none"
        } transition-opacity transition-height duration-300 ease-in-out overflow-hidden`}
      >
        <div className="flex flex-col">
          <h2 className="font-bold">{props.content.message}</h2>
          {props.content.details && <p>{props.content.details}</p>}
        </div>
        <button
          type="button"
          className={`rounded-md focus:outline-none focus:ring-2 hover:bg-${props.color}-300`}
          onClick={() => setIsOpen(false)}
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
