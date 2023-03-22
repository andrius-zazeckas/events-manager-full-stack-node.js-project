import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { MYSQL_CONFIG } from "../config";

const newUserSchema = Joi.object({
  full_name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
  age: Joi.number(),
  date_of_birth: Joi.date(),
});

export const addUser = async (req, res) => {
  let newUserData = req.body;

  try {
    newUserData = await newUserSchema.validateAsync(newUserData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  try {
    const hashedPassword = bcrypt.hashSync(newUserData.password);

    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO users (full_name, email, password) VALUES (${mysql.escape(
        newUserData.full_name
      )},${mysql.escape(newUserData.email)}, '${hashedPassword}')`
    );

    await con.end();

    return res.status(201).send("User registered successfully").end();
  } catch (error) {
    if (error.message.includes("Duplicate entry ")) {
      return res
        .status(400)
        .send({ error: `Email ${newUserData.email} Already in use` });
    }

    return res.status(500).send({ error: error.message });
  }
};
