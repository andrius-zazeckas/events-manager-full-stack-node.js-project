import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";
import Joi from "joi";

export const registerSchema = Joi.object({
  full_name: Joi.string().required(),
  event_id: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().required(),
  date_of_birth: Joi.date().required(),
});

export const register = async (req, res) => {
  let registerData = req.body;

  try {
    registerData = await registerSchema.validateAsync(registerData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }
  //   const today = new Date().toLocaleDateString("lt-LT");
  //   const date_of_birth = new Date(registerData.date_of_birth);
  //   const calculatedAge = date_of_birth - date;

  const age = (birthday) => {
    const diff_ms = Date.now() - birthday.getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  console.log(age(new Date(registerData.date_of_birth)));

  const date_of_birth = registerData.date_of_birth.toLocaleDateString("lt-LT");

  const query = `INSERT INTO visitors (full_name, event_id, email, age, date_of_birth) VALUES ('${
    registerData.full_name
  }', ${registerData.event_id}, '${registerData.email}', ${age(
    new Date(registerData.date_of_birth)
  )}, '${date_of_birth}')`;

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
