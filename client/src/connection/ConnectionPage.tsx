import { useEffect, useState } from "react";
import { useActionData, useSubmit } from "react-router-dom";
import ActionPopup from "../components/ActionPopup";
import { ActionData } from "../network/connectionAPI";
import AnimatedSubmitButton from "../components/AnimatedSubmitButton";
import InputList from "../components/form/InputList";
import ConnectionPageFrame from "./components/ConnectionPageFrame";

export default function () {
  const submit = useSubmit();

  //credentials needed for connection to MariaDB, submitted as a form
  const [host, setHost] = useState<string | null>("localhost");
  const [user, setUser] = useState<string | null>("root");
  const [password, setPassword] = useState<string | null>(null);
  const [database, setDatabase] = useState<string | null>(null);

  //handles the response to the submitted credentials
  const actionData = useActionData() as ActionData;
  let errorMessage = actionData?.error;
  let successMessage = actionData?.success;

  //handles CSS loading animation on button when form is submitted
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    actionData ? setIsLoading(false) : null;
  }, [actionData]);

  function handleConnect(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (host && user && password && database) {
      setIsLoading(true);

      let formData = new FormData();
      formData.append("action", "connect");
      formData.append("host", host);
      formData.append("user", user);
      formData.append("password", password);
      formData.append("database", database);

      submit(formData, { method: "post" });
    }
  }

  return <>
      <ActionPopup
        content={ errorMessage ? errorMessage : successMessage ? successMessage : null }
        variant={ errorMessage ? "error" : successMessage ? "success" : null }
      />
      <ConnectionPageFrame 
        children= {
          <>
            <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
              MariaDB-UI
            </h2>

            <form className="space-y-6">
              <InputList
                inputObjects={[
                  { name: "host", value: host, setState: setHost },
                  { name: "user", value: user, setState: setUser },
                  { name: "password", value: password, setState: setPassword },
                  { name: "database", value: database, setState: setDatabase },
                ]}
              />
            
              <AnimatedSubmitButton
                isLoading={isLoading}
                handleConnect={handleConnect}
              />
           </form>
           
          </>
        } />
    </>
}
