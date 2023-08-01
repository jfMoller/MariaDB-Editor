import React, { useState } from "react";
import { useRouteLoaderData, useSubmit } from "react-router-dom";

interface Props {
  params: {
    rowID: string | undefined;
  };
}

export default function ({ params: { rowID } }: Props) {
  const rowData = useRouteLoaderData("rowData") as any;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(rowData);

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
    } else {
      console.error("Error, rowID is undefined");
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
    // Exclude "id" property from being updated when in editing mode
    if (isEditing && name === "id") {
      return;
    }
    setEditedData((prevData: object) => ({
      ...prevData,
      [name]: value === "null" || value === "" ? null : value,
    }));
  }

  function renderField(key: string, value: any) {
    if (typeof value === "object" && value !== null) {
      return (
        <ul className="w-full flex flex-col">
          {Object.entries(value).map(function ([propertyName, propertyValue]) {
            return (
              <li key={propertyName} className="mb-2">
                <span className="font-bold">{propertyName}: </span>
                <br />
                {isEditing ? (
                  <input
                    type="text"
                    name={`${key}.${propertyName}`}
                    readOnly={propertyName === "id"}
                    value={propertyValue}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <span>{propertyValue}</span>
                )}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <p>
          <span className="font-bold">{key}: </span>
          {isEditing ? (
            <input
              type="text"
              name={key}
              value={value === null ? "null" : value}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          ) : (
            value
          )}
        </p>
      );
    }
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(editedData).map(([key, value]) => (
          <div key={key} className="mb-4">
            <div className="pl-4">{renderField(key, value)}</div>
          </div>
        ))}
      </div>
      {isEditing ? (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-end items-center mt-4">
          <button
            onClick={handleEdit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleDelete(rowID);
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}