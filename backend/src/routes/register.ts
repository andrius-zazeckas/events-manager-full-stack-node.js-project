import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";
import Joi from "joi";

export const registerSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  event_id: Joi.number().integer().required(),
  email: Joi.string().email().trim().required(),
  date_of_birth: Joi.date().required(),
});

export const register = async (req, res) => {
  let registerData = req.body;

  try {
    registerData = await registerSchema.validateAsync(registerData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  const age = (birthday) => {
    const diff_ms = Date.now() - birthday.getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const date_of_birth = registerData.date_of_birth.toLocaleDateString("lt-LT");

  const query = `INSERT INTO visitors (first_name, last_name, event_id, email, age, date_of_birth) VALUES ('${
    registerData.first_name
  }', '${registerData.last_name}', ${registerData.event_id}, '${
    registerData.email
  }', ${age(registerData.date_of_birth)}, '${date_of_birth}')`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(query);

    await con.end();

    res.status(200).send({ message: `Registered succesfully` });
  } catch (error) {
    if (error.message.includes("Duplicate entry ")) {
      return res
        .status(400)
        .send({ error: `Email ${registerData.email} Already in use` })
        .end();
    }

    return res.status(500).send({ error: error.message }).end();
  }
};
