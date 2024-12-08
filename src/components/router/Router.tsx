import { createBrowserRouter } from "react-router-dom";
import { Login } from "../auth/Login";
import { SignUp } from "../auth/Signup";
import { Home } from "../home/Home";
import { Profile } from "../profile/Profile";

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
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);
