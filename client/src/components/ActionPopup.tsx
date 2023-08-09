import { useEffect, useState } from "react";
import XMarkButton from "./XMarkButton";

export default function ActionPopup(props: {
  content: { message: string; details: string | null } | null;
  variant: string | null;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const bg =
    props.variant == "error"
      ? "bg-red-600"
      : props.variant == "success"
      ? "bg-green-600"
      : "bg-blue-600";

  useEffect(() => {
    setIsOpen(!!props.content);
  }, [props.content]);

  if (isOpen && props.content) {
    return (
      <div
        className={"absolute z-50 shadow-lg px-6 pt-2 pb-2 max-h-max min-w-full bg-gray-800 bg-opacity-95 border border-gray-700"}
      >
        <div className="flex items-center justify-between">
          <h2 className={"font-bold text-white px-2 rounded-md " + bg}>
            {props.content.message}
          </h2>
          <XMarkButton
            handleClick={() => setIsOpen(false)} bg={bg}
          />
        </div>
        {props.content.details && (
          <p className="text-white pb-3">{props.content.details}</p>
        )}
      </div>
    );
  } else {
    return null;
  }
}
