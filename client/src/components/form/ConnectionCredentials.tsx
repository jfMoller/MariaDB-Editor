import React from "react";
import { Dispatch } from "react";
import Input from "./Input";

interface InputObjects {
  name: string;
  value: string | null;
  setState: Dispatch<React.SetStateAction<string | null>>;
}

export default function ConnectionCredentials(props: { inputObjects: InputObjects[]; }) {

  function capitalizeFirstLetter(string: string) {
    const [firstLetter, ...remainingLetters] = string;
    return firstLetter.toUpperCase() + remainingLetters.join('');
  }
  
  function setupInputs(inputData: InputObjects[]) {
    return inputData.map((object) => (
      <Input
        key={object.name}
        name={object.name}
        type={object.name === "password" ? "password" : "text"}
        placeholder={capitalizeFirstLetter(object.name)}
        isRequired={true}
        value={object.value || ""}
        handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          object.setState(event.target.value)
        }
      />
    ));
  }

  return <>{setupInputs(props.inputObjects)}</>;
}
