import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";
import Joi from "joi";

const newEventSchema = Joi.object({
  event_name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  date: Joi.date().required(),
  image: Joi.string().trim(),
});

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
      `SELECT * FROM visitors WHERE event_id = ${id}`
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

export const getEventById = async (req, res) => {
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
    const [event] = await con.execute(`SELECT * FROM events WHERE id = ${id}`);

    if (Array.isArray(event) && !event.length) {
      return res.status(404).send(`Event with ID - ${id} not found`).end();
    }

    await con.end();

    return res.status(200).send(event).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const addEvent = async (req, res) => {
  let newEventData = req.body;

  try {
    newEventData = await newEventSchema.validateAsync(newEventData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  const date = newEventData.date.toLocaleDateString("lt-LT");

  const query = `INSERT INTO events (event_name, description, date, image) VALUES ('${newEventData.event_name}', '${newEventData.description}', '${date}', '${newEventData.image}')`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(query);

    await con.end();

    res.status(200).send({ message: `Event added succesfully` });
  } catch (error) {
    if (error.message.includes("Duplicate entry ")) {
      return res
        .status(400)
        .send({ error: `Event "${newEventData.event_name}" Already exists` })
        .end();
    }

    return res.status(500).send({ error: error.message }).end();
  }
};

export const editEvent = async (req, res) => {
  const id = +mysql.escape(req.params.id.trim()).replaceAll("'", "");
  let updatedEvent = req.body;

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

    try {
      updatedEvent = await newEventSchema.validateAsync(updatedEvent);
    } catch (error) {
      return res.status(400).send({ error: error.message }).end();
    }

    const date = updatedEvent.date.toLocaleDateString("lt-LT");

    await con.execute(
      `UPDATE events SET event_name = '${updatedEvent.event_name}', description = '${updatedEvent.description}', 
      image = '${updatedEvent.image}', date = '${date}' WHERE id = ${id}`
    );

    await con.end();

    return res.status(201).send("Event updated successfully").end();
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      return res
        .status(400)
        .send({ error: `Event "${updatedEvent.event_name}" Already exists` });
    }

    return res.status(500).send({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
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

    const query = `DELETE FROM events WHERE id = ${id}`;

    await con.execute(query);

    await con.end();

    res.status(202).send("Event was deleted").end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
