import { type FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddEvent,
  EditEvent,
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
  RequireAdmin,
  RequireAuth,
  Users,
  Visitors,
} from "..";

export const MainRouter: FC = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/events" element={<Events />} />
        <Route path="/events/add-event" element={<AddEvent />} />
        <Route path="/events/edit-event/:id" element={<EditEvent />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/visitors/register" element={<RegisterNewVisitor />} />
        <Route path="/visitors/edit-visitor/:id" element={<EditVisitor />} />

        <Route path="/events/event-visitors/:id" element={<EventVisitors />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route
          path="/users"
          element={
            <RequireAdmin>
              <Users />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/register-user"
          element={
            <RequireAdmin>
              <RegisterNewUser />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/edit-user/:id"
          element={
            <RequireAdmin>
              <EditUser />
            </RequireAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
