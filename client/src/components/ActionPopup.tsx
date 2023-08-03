import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function ActionPopup(props: {
  content: { message: string; details: string | null } | null;
  color?: string | null;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(!!props.content);
  }, [props.content]);

  if (isOpen && props.content) {
    return (
      <div
        className={`fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-screen-sm ${
            props.color ? `bg-${props.color}-500` : "bg-blue-500"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold border-b border-b-black">{props.content.message}</h2>
            <button
              type="button"
              className={`rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white ${
                props.color ? `bg-${props.color}-300` : "bg-blue-300"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
            </button>
          </div>
          {props.content.details && (
            <p className="">{props.content.details}</p>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}