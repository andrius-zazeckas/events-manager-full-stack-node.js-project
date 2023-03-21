import express from "express";
import cors from "cors";
import { login } from "./src/routes/login";
import { PORT } from "./src/config";
import { isLoggedIn } from "./src/middleware";
import { register } from "./src/routes/register";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", login);
app.post("/register", register);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
