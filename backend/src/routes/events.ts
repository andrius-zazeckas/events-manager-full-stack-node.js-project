import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";

export const getEvents = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [events] = await con.execute(`SELECT * FROM events`);

    await con.end();

    return res.status(200).send(events).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const getEventVisitors = async (req, res) => {
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
      `SELECT * FROM events WHERE id = ${id}`
    );

    if (Array.isArray(idExists) && !idExists.length) {
      return res.status(404).send(`Event with ID - ${id} not found`).end();
    }

    const [events] = await con.execute(
      `SELECT * FROM visitors WHERE event_id = ${id}`
    );

    await con.end();

    return res.status(200).send(events).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};
