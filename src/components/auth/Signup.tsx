import { Link } from "react-router-dom";
import { useCreateUser } from "@/hooks/useCreateUser";
import { Auth } from "./Auth";

export const SignUp = () => {
  const [createUser] = useCreateUser();
  return (
    <>
      <Auth
        submitLabel={"SignUp"}
        onSubmit={async ({ email, password }): Promise<void> => {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
        }}
      >
        <Link to={"/login"}>Login</Link>
      </Auth>
    </>
  );
};
