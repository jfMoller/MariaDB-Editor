import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

export default function RowDataList() {
  const rowData = useRouteLoaderData("rowData") as any;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(rowData);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    // Perform save operation with editedData
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

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(editedData).map(function ([key, value]) {
          return (
            <div key={key} className="mb-4">
              <div className="pl-4">
                {typeof value === "object" ? (
                  <ul className="w-full">
                    {Object.entries(value).map(function ([nestedKey, nestedValue]) {
                      return (
                        <li key={nestedKey} className="mb-2">
                          <span className="font-bold">{nestedKey}: </span>
                          <br />
                          {isEditing ? (
                            <input
                              type="text"
                              name={nestedKey}
                              value={nestedValue}
                              onChange={handleInputChange}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            <span>{nestedValue}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>
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
                )}
              </div>
            </div>
          );
        })}
      </div>
      {isEditing ? (
        <div className="mt-4">
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
        <div className="mt-4">
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