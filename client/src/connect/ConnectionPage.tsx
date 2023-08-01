import React, { useEffect, useState } from "react";
import { useActionData, useSubmit } from "react-router-dom";
import ActionPopup from "../components/ActionPopup";

export default function () {
  const submit = useSubmit();
  const [isLoading, setIsLoading] = useState(false);

  const [host, setHost] = useState<string | null>("localhost");
  const [user, setUser] = useState<string | null>("root");
  const [password, setPassword] = useState<string | null>(null);
  const [database, setDatabase] = useState<string | null>(null);

  const actionData: any = useActionData();
  let errorMessage = actionData?.error;
  let successMessage = actionData?.success;

  useEffect(() => {
    actionData ? setIsLoading(false) : null;
  }, [actionData]);

  function handleConnect(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (host && user && password && database) {
      setIsLoading(true); // Set loading state to true when the form is submitted

      let formData = new FormData();
      formData.append("action", "connect");
      formData.append("host", host);
      formData.append("user", user);
      formData.append("password", password);
      formData.append("database", database);

      submit(formData, { method: "post" });
    } else {
      console.error("Error, missing credentials");
    }
  }

  return (
    <>
      <ActionPopup
        content={errorMessage ? errorMessage : successMessage ? successMessage : null}
        color={errorMessage ? "red" : successMessage ? "green" : null}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow">
          <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
            MariaDB-UI
          </h2>
          <form className="space-y-6">
            <div>
              <input
                id="host"
                name="host"
                type="text"
                required
                value={host || ""}
                onChange={(e) => setHost(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-sm text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Host"
              />
            </div>
            <div>
              <input
                id="user"
                name="user"
                type="text"
                required
                value={user || ""}
                onChange={(e) => setUser(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-sm text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="User"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-sm text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                id="database"
                name="database"
                type="text"
                required
                value={database || ""}
                onChange={(e) => setDatabase(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-sm text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Database"
              />
            </div>
            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-6 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={isLoading}
                onClick={handleConnect}
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                ) : (
                  "Connect"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}