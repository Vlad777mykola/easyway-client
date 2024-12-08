import { authenticatedVar } from "@/constants/authenticated";
import { useGetMe } from "@/hooks/useGetMe";
import { useEffect } from "react";

interface IGuardProps {
  children: JSX.Element;
}

const EXECUTED_ROUTES = ["/login", "/signup"];

const Guard = ({ children }: IGuardProps) => {
  const { data: user } = useGetMe();

  useEffect(() => {
    if (user) authenticatedVar(true);
  }, [user]);

  console.log(user);

  return (
    <>
      {EXECUTED_ROUTES.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
