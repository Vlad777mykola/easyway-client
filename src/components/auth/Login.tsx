import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { Auth } from "./Auth";

export const Login = () => {
  const { login, error } = useLogin();

  return (
    <>
      <Auth submitLabel={"Login"} onSubmit={(request) => login(request)}>
        <Link to={"/signup"}>SingUp</Link>
      </Auth>
    </>
  );
};
