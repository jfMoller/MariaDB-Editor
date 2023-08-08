import React, { useState } from "react";
import { useRouteLoaderData, useSubmit } from "react-router-dom";
import Input from "../components/form/Input";
import Button from "../components/Button";
import ConfirmDialogue from "../components/ConfirmDialogue";

export default function (props: { rowID: string }) {
  //returns the data for the selected row
  const rowData = useRouteLoaderData("rowData") as any;

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(rowData);

  const [confirmSave, setConfirmSave] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const submit = useSubmit();

  function handleEdit() {
    setIsEditing(true);
  }

  function handleDelete(rowID: string | undefined) {
    if (rowID) {
      let formData = new FormData();
      formData.append("action", "delete-row-data");
      formData.append("rowID", rowID);
      submit(formData, { method: "post" });
    }
  }

  function handleSave() {
    let formData = new FormData();
    formData.append("action", "edit-row-data");
    formData.append("data", JSON.stringify(editedData));
    submit(formData, { method: "post" });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedData(rowData);
    setIsEditing(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setEditedData((originalData: object) => ({
      ...originalData,
      [name]: value === "null" || value === "" ? null : value,
    }));
  }

  function renderRowElements(propertyName: string, value: any) {
    return (
      <div className="w-full flex flex-col">
        
         <ConfirmDialogue
            visible={confirmDelete}
            color="red"
            caption="Confirm delete"
            description="Are you sure you want to delete this row?"
            confirmButton="Confirm"
            onConfirm={() => {handleDelete(props.rowID);}}
            onCancel={() => {setConfirmDelete(false)}} />

          <ConfirmDialogue
            visible={confirmSave}
            color="blue"
            caption="Confirm save"
            description="Are you sure you want to save this row?"
            confirmButton="Confirm"
            onConfirm={() => {handleSave();}}
            onCancel={() => {setConfirmSave(false)}} />

          <h4 className="font-bold">{propertyName}: </h4>
          {isEditing ? (
            <Input
              name={propertyName}
              type={"text"}
              value={value ? value : "null"}
              readOnly={propertyName === "id" ? true : false}
              handleChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
          />
          ) : (
            <span>{value ? value : "null"}</span>
          )}
      </div>
    );
  }

  return (
    <div className="p-4 text-white rounded-md border bg-gray-800 border-gray-700">
        {Object.entries(editedData).map(([propertyName, value], index: number) => (
          <div key={`divKey${propertyName}-${index}`} className="mb-4">
            {renderRowElements(propertyName, value)}
          </div>
        ))}

      {isEditing ? (
        <div className="mt-4 flex justify-end">
          <Button text={"Save"} color={"blue"} handleClick={() => setConfirmSave(true)}/>
          <Button text={"Cancel"} color={"gray"} handleClick={handleCancel}/>
        </div>
      ) : (
        <div className="mt-4 flex justify-end">
          <Button text={"Edit"} color={"green"} handleClick={handleEdit}/>
          <Button text={"Delete"} color={"red"} handleClick={() => setConfirmDelete(true)}/>
        </div>
      )}
    </div>
  );
}
