import { db } from "../database/connection.database.js";

const create = async ({ email, password, username }) => {
  const query = {
    text: `
      INSERT INTO users (email,password,username) 
      VALUES ($1,$2,$3)
      RETURNING email,username,uid;
    `,
    values: [email, password, username],
  };

  const { rows } = await db.query(query);
  return rows;
};

const findeByEmail = async (email) => {
  const query = {
    text: `
      SELECT * FROM users 
      WHERE email = $1;
    `,
    values: [email],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const changeName = async ({ email, username }) => {
  const query = {
    text: `
      UPDATE users
      SET username = $1
      WHERE email = $2
      RETURNING email,username,uid;
    `,
    values: [username, email],
  };

  const { rows } = await db.query(query);
  return rows;
};

export const UserModel = {
  create,
  findeByEmail,
  changeName,
};
