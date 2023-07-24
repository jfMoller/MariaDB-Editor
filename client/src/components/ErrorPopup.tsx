import { MouseEventHandler } from "react";

export default function (props: {
  error: { title: string; details: string };
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
}) {
if (props.error) {
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <h2>{props.error.title}</h2>
        <p>{props.error.details}</p>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
}
else {
    return null;
}
}
