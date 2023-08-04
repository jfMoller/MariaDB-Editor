import React from "react";
import { Dispatch } from "react";
import Input from "./Input";
import { capitalizeFirstLetter } from "../../utilities/capitalizeFirstLetter";

interface InputObjects {
  name: string;
  value: string | null;
  setState: Dispatch<React.SetStateAction<string | null>>;
}

export default function InputList(props: { inputObjects: InputObjects[] }) {
  function renderInputElements(objects: InputObjects[]) {
    return objects.map((object) => (
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

  return <>{renderInputElements(props.inputObjects)}</>;
}
