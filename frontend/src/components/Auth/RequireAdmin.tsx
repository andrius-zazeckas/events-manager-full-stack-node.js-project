import { type FC, ReactElement } from "react";
import { Login } from "../Login";
import { useLoginStatus } from "./LoggedIn";

export const RequireAdmin: FC<{ children: ReactElement }> = ({ children }) => {
  const { isAdmin } = useLoginStatus();

  if (!isAdmin) {
    return <Login />;
  }

  return children;
};
