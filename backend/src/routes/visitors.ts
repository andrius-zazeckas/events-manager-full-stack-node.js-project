import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";
import { registerSchema } from "./register";

export const getVisitors = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [visitors] = await con.execute(
      `SELECT visitors.id, visitors.first_name, visitors.last_name, visitors.event_id, visitors.email, visitors.age, visitors.date_of_birth, events.event_name FROM visitors INNER JOIN events ON visitors.event_id = events.id`
    );

    await con.end();

    return res.status(200).send(visitors).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const getVisitorById = async (req, res) => {
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
    const [visitor] = await con.execute(
      `SELECT visitors.id, visitors.first_name, visitors.last_name, visitors.event_id, visitors.email, visitors.age, visitors.date_of_birth, events.event_name FROM visitors INNER JOIN events ON visitors.event_id = events.id WHERE visitors.id = ${id}`
    );

    if (Array.isArray(visitor) && !visitor.length) {
      return res.status(404).send(`Visitor with ID - ${id} not found`).end();
    }

    await con.end();

    return res.status(200).send(visitor).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const deleteVisitor = async (req, res) => {
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
      `SELECT * FROM visitors WHERE id = ${id}`
    );

    if (Array.isArray(idExists) && !idExists.length) {
      return res.status(404).send(`Visitor with ID - ${id} not found`).end();
    }

    const query = `DELETE FROM visitors WHERE id = ${id}`;

    await con.execute(query);

    await con.end();

    res.status(202).send("Visitor was deleted").end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const editVisitor = async (req, res) => {
  const id = +mysql.escape(req.params.id.trim()).replaceAll("'", "");
  let updatedVisitor = req.body;

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
      `SELECT * FROM visitors WHERE id = ${id}`
    );

    if (Array.isArray(idExists) && !idExists.length) {
      return res.status(404).send(`User with ID - ${id} not found`).end();
    }

    try {
      updatedVisitor = await registerSchema.validateAsync(updatedVisitor);
    } catch (error) {
      return res.status(400).send({ error: error.message }).end();
    }

    const age = (birthday) => {
      const diff_ms = Date.now() - birthday.getTime();
      const age_dt = new Date(diff_ms);

      return Math.abs(age_dt.getUTCFullYear() - 1970);
    };

    const date_of_birth =
      updatedVisitor.date_of_birth.toLocaleDateString("lt-LT");

    await con.execute(
      `UPDATE visitors SET first_name = '${
        updatedVisitor.first_name
      }', last_name = '${updatedVisitor.last_name}', event_id = ${
        updatedVisitor.event_id
      }, 
      email = '${updatedVisitor.email}', age = ${age(
        updatedVisitor.date_of_birth
      )} , date_of_birth = '${date_of_birth}' WHERE id = ${id}`
    );

    await con.end();

    return res.status(201).send("User updated successfully").end();
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      return res
        .status(400)
        .send({ error: `Email - ${updatedVisitor.email} Already in use` });
    }

    return res.status(500).send({ error: error.message });
  }
};
