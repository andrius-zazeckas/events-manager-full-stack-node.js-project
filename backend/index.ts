import express from "express";
import cors from "cors";
import { login } from "./src/routes/login";
import { PORT } from "./src/config";
import { isLoggedIn, isAdmin } from "./src/middleware";
import { addUser, deleteUser, updateUser } from "./src/routes/admin";
import { register } from "./src/routes/register";
import {
  deleteVisitor,
  getVisitors,
  updateVisitor,
} from "./src/routes/visitors";
import { getEvents, getEventVisitors } from "./src/routes/events";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", login);
app.post("/register", isLoggedIn || isAdmin, register);

app.get("/visitors", isLoggedIn || isAdmin, getVisitors);
app.delete(
  "/visitors/delete-visitor/:id",
  isLoggedIn || isAdmin,
  deleteVisitor
);
app.patch("/visitors/update-visitor/:id", isLoggedIn || isAdmin, updateVisitor);

app.get("/events", getEvents);
app.get("/events/event-visitors/:id", isLoggedIn || isAdmin, getEventVisitors);

app.post("/admin/add", isAdmin, addUser);
app.delete("/admin/delete-user/:id", isAdmin, deleteUser);
app.patch("/admin/update-user/:id", isAdmin, updateUser);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
