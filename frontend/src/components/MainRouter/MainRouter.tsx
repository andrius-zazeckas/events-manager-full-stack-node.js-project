import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "..";

export const MainRoouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
