import { type FC, ReactElement } from "react";
import { Login } from "../Login";
import { useLoginStatus } from "./LoggedIn";

export const RequireAuth: FC<{ children: ReactElement }> = ({ children }) => {
  const { isLoggedIn } = useLoginStatus();

  if (!isLoggedIn) {
    return <Login />;
  }
  return children;
};
