import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Login, NotFoundPage } from "..";

export const MainRoouter = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
