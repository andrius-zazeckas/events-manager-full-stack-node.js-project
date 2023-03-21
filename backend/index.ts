import express from "express";
import cors from "cors";
import { login } from "./src/modules/login";

const app = express();

app.use(express.json());
app.use(cors());

app.post("login", login);
