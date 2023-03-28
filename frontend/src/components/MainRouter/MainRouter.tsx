import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  EditUser,
  EditVisitor,
  Events,
  EventVisitors,
  Header,
  Home,
  Login,
  NotFoundPage,
  RegisterNewUser,
  RegisterNewVisitor,
  Users,
  Visitors,
} from "..";

export const MainRouter = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
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
    setIsUserLoggedIn(true);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  console.log(isLoggedIn, isAdmin, isUserLoggedIn);

  return (
    <BrowserRouter>
      <Header />

      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/visitors/register" element={<RegisterNewVisitor />} />
          <Route path="/visitors/edit-visitor/:id" element={<EditVisitor />} />

          <Route
            path="/events/event-visitors/:id"
            element={<EventVisitors />}
          />
          <Route path="*" element={<NotFoundPage />} />

          {isAdmin && <Route path="/users" element={<Users />} />}

          {isAdmin && (
            <Route path="/admin/register-user" element={<RegisterNewUser />} />
          )}

          {isAdmin && (
            <Route path="/admin/edit-user/:id" element={<EditUser />} />
          )}
        </Routes>
      ) : (
        <Box textAlign="center" margin="40px">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Box>
      )}
    </BrowserRouter>
  );
};
