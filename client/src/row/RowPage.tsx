import React, { useState } from "react";
import { useRouteLoaderData, useSubmit } from "react-router-dom";

export default function MyComponent() {
  const rowData = useRouteLoaderData("rowData") as any;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(rowData);

  const submit = useSubmit();

  function handleEdit() {
    setIsEditing(true);
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
    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const renderField = (key: string, value: any) => {
    if (typeof value === "object") {
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
              value={value}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          ) : (
            value
          )}
        </p>
      );
    }
  };

  return (
    <div>
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
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleEdit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}