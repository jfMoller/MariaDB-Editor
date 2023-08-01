import { Outlet, redirect } from "react-router-dom";
import { connectionAPI } from "../network/connectionAPI";
import ConnectionPage from "./ConnectionPage";

export const connectionRoute = {
  path: "/",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <ConnectionPage />,
      //@ts-ignore
      action: async ({ request }) => {
        const { action, host, user, password, database } = Object.fromEntries(await request.formData());
        if (action === "connect") {
          const connection = await connectionAPI.connectToDatabase(
            host,
            user,
            password,
            database
          );

          if (connection.error) {
            return connection;
          } else if (connection.success) {
            return redirect(`/${database}`);
          }
        }
      },
    },
  ],
};
