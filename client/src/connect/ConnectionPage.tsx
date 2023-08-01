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

      submit(formData, { method: "post" })
    } else {
      console.error("Error, missing credentials");
    }

    console.log("Host:", host);
    console.log("User:", user);
    console.log("Password:", password);
    console.log("Database:", database);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <ActionPopup
              content={errorMessage ? errorMessage : successMessage ? successMessage : null}
              color={errorMessage ? "red" : successMessage ? "green" : null}

            />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to Database Editor
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleConnect}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="host" className="sr-only">
                Host
              </label>
              <input
                id="host"
                name="host"
                type="text"
                required
                value={host || ""}
                onChange={(e) => setHost(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Host"
              />
            </div>
            <div>
              <label htmlFor="user" className="sr-only">
                User
              </label>
              <input
                id="user"
                name="user"
                type="text"
                required
                value={user || ""}
                onChange={(e) => setUser(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="User"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="database" className="sr-only">
                Database
              </label>
              <input
                id="database"
                name="database"
                type="text"
                required
                value={database || ""}
                onChange={(e) => setDatabase(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Database"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
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
  );
}