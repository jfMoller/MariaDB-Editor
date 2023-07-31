import { Outlet, redirect } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import { API } from "../network/API";

export const loginRoute = {
  path: "/",
  element: <Outlet />,
  children: [
    { index: true, 
      element: <LoginPage />,
        //@ts-ignore
  action: async ({ request }) => {
    const input = Object.fromEntries(await request.formData());
    if (input.action === "login") {
      console.log(input)
      await API.login(input.host, input.user, input.password, input.database);
      return redirect(`/${input.database}`);
    }
  },
    }
  ],
};
