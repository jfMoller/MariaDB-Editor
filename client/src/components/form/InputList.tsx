import React from "react";
import { Dispatch } from "react";
import Input from "./Input";
import { capitalizeFirstLetter } from "../../utilities/capitalizeFirstLetter";

interface InputObject {
  name: string;
  value: string | null;
  setState: Dispatch<React.SetStateAction<string | null>>;
}

export default function InputList(props: { inputObjects: InputObject[] }) {
  function renderInputElements(objects: InputObject[]) {
    return objects.map((object, index: number) => (
      <Input
        key={`inputKey:${object.name}-${index}`}
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

  return <>{renderInputElements(props.inputObjects)}</>;
}
