import { useEffect, useState } from "react";

export const useLoginStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const adminId = document.cookie;

    if (token) {
      setIsLoggedIn(true);
    }

    if (token && adminId === "id=1") {
      setIsAdmin(true);

      return;
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return { isLoggedIn, isAdmin };
};
