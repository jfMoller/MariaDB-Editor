import { Outlet } from "react-router-dom";
import { connectionAPI } from "../network/connectionAPI";
import ConnectionPage from "./ConnectionPage";

export const connectionRoutes = {
  path: "/",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <ConnectionPage />,
      //@ts-ignore
      action: async ({ request }) => {
        const { action, host, user, password, database } = Object.fromEntries(
          await request.formData()
        );
        if (action === "connect") {
          return await connectionAPI.connectToDatabase(
            host, user, password, database
          );
        }
      },
    },
  ],
};
