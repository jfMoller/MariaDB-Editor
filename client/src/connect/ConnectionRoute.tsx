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
        const input = Object.fromEntries(await request.formData());
        if (input.action === "connect") {
          const connection = await connectionAPI.connectToDatabase(
            input.host,
            input.user,
            input.password,
            input.database
          );

          if (connection.error) {
            return connection;
          } else if (connection.success) {
            return redirect(`/${input.database}`);
          }
        }
      },
    },
  ],
};
