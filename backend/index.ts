import express from "express";
import cors from "cors";
import { login } from "./src/routes/login";
import { PORT } from "./src/config";
import { isLoggedIn, isAdmin } from "./src/middleware";
import { addUser, deleteUser, updateUser } from "./src/routes/admin";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", login);
app.post("/admin/add", isAdmin, addUser);
app.delete("/admin/delete/:id", isAdmin, deleteUser);
app.patch("/admin/update/:id", isAdmin, updateUser);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
