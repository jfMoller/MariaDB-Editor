import React, { useState } from "react";
import { useRouteLoaderData, useSubmit } from "react-router-dom";
import Button from "../components/Button";
import ConfirmDialogue from "../components/ConfirmDialogue";

export default function QueryPage(props : { data: string}) {
  //returns the data for the selected row
  const rowData = useRouteLoaderData("rowData") as any;

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(rowData);

  const [confirmQuery, setConfirmQuery] = useState<boolean>(false);

  const submit = useSubmit();

  function handleEdit() {
    setIsEditing(true);
  }

  function handleQuery() {
    let formData = new FormData();
    formData.append("action", "query");
    formData.append("data", JSON.stringify(editedData));
    submit(formData, { method: "post" });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedData(rowData);
    setIsEditing(false);
  }


  function renderQueryElements(sql: string) {
    return (
      <div className={"w-full flex flex-col flex-wrap"}>

          <ConfirmDialogue
            visible={confirmQuery}
            color="blue"
            caption="Confirm save"
            description="Are you sure you want to save this row?"
            confirmButton="Confirm"
            onConfirm={() => {handleQuery();}}
            onCancel={() => {setConfirmQuery(false)}} />

          <h4 className="font-bold">{"SQL"}: </h4>
          {isEditing ? (
           <textarea value={sql}></textarea>
          ) : (
            <span>{sql}</span>
          )}
      </div>
    );
  }

  return (
    <div className="p-4 text-white rounded-md border bg-gray-800 border-gray-700">

          <div key={`divKey$-141`} className="mb-4">
            {renderQueryElements(props.data)}
          </div>
       

      {isEditing ? (
        <div className="mt-4 flex justify-between sm:justify-end">
          <Button text={"Save"} color={"blue"} className={"mr-4 sm:mr-0"} handleClick={() => setConfirmQuery(true)}/>
          <Button text={"Cancel"} color={"gray"} handleClick={handleCancel}/>
        </div>
      ) : (
        <div className="mt-4 flex justify-between sm:justify-end">
          <Button text={"Edit"} color={"green"} className={"mr-4 sm:mr-0"} handleClick={handleEdit}/>
        </div>
      )}
    </div>
  );
}
