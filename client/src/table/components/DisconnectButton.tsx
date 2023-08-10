import { useSubmit } from "react-router-dom";

export default function DisconnectButton() {
  const submit = useSubmit();

  function handleDisconnect() {
    let formData = new FormData();
    formData.append("action", "disconnect-from-database");
    submit(formData, { method: "post" });
  }

  return (
    <button
      key={"disconnect"}
      onClick={handleDisconnect}
      className="cursor-pointer max-h-11 min-h-11 text-white px-4 py-2 ml-4 rounded-md border border-gray-300 hover:bg-gray-700"
    >
      Disconnect
    </button>
  );
}
