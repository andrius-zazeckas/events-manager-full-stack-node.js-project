import express from "express";
import cors from "cors";
import { login } from "./src/routes/login";
import { PORT } from "./src/config";
import { isLoggedIn } from "./src/middleware";
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from "./src/routes/admin";
import { register } from "./src/routes/register";
import {
  deleteVisitor,
  editVisitor,
  getVisitorById,
  getVisitors,
} from "./src/routes/visitors";
import {
  addEvent,
  deleteEvent,
  editEvent,
  getEventById,
  getEvents,
  getEventVisitors,
} from "./src/routes/events";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", login);

app.post("/visitors/register", isLoggedIn, register);
app.get("/visitors", isLoggedIn, getVisitors);
app.get("/visitors/visitor/:id", isLoggedIn, getVisitorById);
app.delete("/visitors/delete-visitor/:id", isLoggedIn, deleteVisitor);
app.patch("/visitors/edit-visitor/:id", isLoggedIn, editVisitor);

app.get("/events", isLoggedIn, getEvents);
app.get("/events/event-visitors/:id", isLoggedIn, getEventVisitors);
app.get("/events/event/:id", isLoggedIn, getEventById);
app.post("/events/add-event", isLoggedIn, addEvent);
app.patch("/events/edit-event/:id", isLoggedIn, editEvent);
app.delete("/events/delete-event/:id", isLoggedIn, deleteEvent);

app.get("/admin/users", isLoggedIn, getUsers);
app.get("/admin/users/:id", isLoggedIn, getUserById);
app.post("/admin/register-user", isLoggedIn, addUser);
app.delete("/admin/delete-user/:id", isLoggedIn, deleteUser);
app.patch("/admin/edit-user/:id", isLoggedIn, editUser);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
