import { createBrowserRouter } from "react-router-dom";
import { Login } from "../auth/Login";
import { SignUp } from "../auth/Signup";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <div>Home</div>,
  },
]);
