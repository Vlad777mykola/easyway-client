import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { Auth } from "./Auth";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "@/constants/authenticated";

export const Login = () => {
  const { login, error } = useLogin();
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <>
      <Auth submitLabel={"Login"} onSubmit={(request) => login(request)}>
        <Link to={"/signup"}>SingUp</Link>
        {`${authenticated}`}
      </Auth>
    </>
  );
};
