import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { MYSQL_CONFIG } from "../config";

const newUserSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().required(),
});

export const addUser = async (req, res) => {
  let newUser = req.body;

  try {
    newUser = await newUserSchema.validateAsync(newUser);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  try {
    const hashedPassword = bcrypt.hashSync(newUser.password);

    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO users (username, password) VALUES (${mysql.escape(
        newUser.username
      )}, '${hashedPassword}')`
    );

    await con.end();

    return res.status(201).send("User added successfully").end();
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      return res
        .status(400)
        .send({ error: `Username - ${newUser.username} Already in use` })
        .end();
    }

    return res.status(500).send({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = +mysql.escape(req.params.id.trim()).replaceAll("'", "");

  if (id < 0 || Number.isNaN(id) || typeof id !== "number") {
    return res
      .status(400)
      .send({
        error: `Please provide id as a number in the URL: current id ${id} incorrect.`,
      })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [idExists] = await con.execute(
      `SELECT * FROM users WHERE id = ${id}`
    );

    if (Array.isArray(idExists) && !idExists.length) {
      return res.status(404).send(`User with ID - ${id} not found`).end();
    }

    const query = `DELETE FROM users WHERE id = ${id}`;

    await con.execute(query);

    await con.end();

    res.status(202).send("User was deleted").end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const updateUser = async (req, res) => {
  const id = +mysql.escape(req.params.id.trim()).replaceAll("'", "");
  let newUser = req.body;

  if (id < 0 || Number.isNaN(id) || typeof id !== "number") {
    return res
      .status(400)
      .send({
        error: `Please provide id as a number in the URL: current id ${id} incorrect.`,
      })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [idExists] = await con.execute(
      `SELECT * FROM users WHERE id = ${id}`
    );

    if (Array.isArray(idExists) && !idExists.length) {
      return res.status(404).send(`User with ID - ${id} not found`).end();
    }

    // await con.execute(query);

    // await con.end();

    // res.status(202).send("User was deleted").end();

    try {
      newUser = await newUserSchema.validateAsync(newUser);
    } catch (error) {
      return res.status(400).send({ error: error.message }).end();
    }

    const hashedPassword = bcrypt.hashSync(newUser.password);

    await con.execute(
      `UPDATE users SET username = ${mysql.escape(
        newUser.username
      )}, password = ${mysql.escape(hashedPassword)} WHERE id = ${id}`
    );

    await con.end();

    return res.status(201).send("User updated successfully").end();
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      return res
        .status(400)
        .send({ error: `Username - ${newUser.username} Already in use` })
        .end();
    }

    return res.status(500).send({ error: error.message });
  }
};
