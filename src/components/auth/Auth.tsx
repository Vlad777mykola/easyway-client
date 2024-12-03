import { useState } from "react";
import { Button } from "antd";
import { Input } from "antd";
import style from "./auth.module.css";

export const Auth = ({
  submitLabel,
  onSubmit,
  children,
}: {
  submitLabel: string;
  onSubmit: (req: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const onChange = (value: string, key: "email" | "password") => {
    setAuth((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={style.authContainer}>
      <Input
        placeholder="email"
        value={auth.email}
        onChange={(e) => onChange(e.target.value, "email")}
      />
      <Input
        placeholder="password"
        value={auth.password}
        onChange={(e) => onChange(e.target.value, "password")}
      />
      <Button
        type="primary"
        onClick={() => onSubmit({ email: auth.email, password: auth.password })}
      >
        {submitLabel}
      </Button>
      {children}
    </div>
  );
};
