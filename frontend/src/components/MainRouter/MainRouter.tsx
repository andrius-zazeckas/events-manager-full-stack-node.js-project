import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Login, Management, NotFoundPage } from "..";
import { Events } from "../Events/Events";

export const MainRouter = () => {
  // const [isAuth, setIsAuth] = useState(true);

  // const isAuthed = () => {
  //   if (!localStorage.getItem("token")) {
  //     return setIsAuth(false);
  //   }
  //   return setIsAuth(true);
  // };

  // useEffect(() => {
  //   isAuthed();
  //   if (!isAuth) {
  //     return window.location.assign(`./`);
  //   }
  // }, []);

  // console.log(isAuth);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/management" element={<Management />} />
        <Route path="/events" element={<Events />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
