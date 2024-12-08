import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "@/constants/authenticated";

export const Home = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <>
      Is authenticated <br />
      {`${authenticated}`}
    </>
  );
};
