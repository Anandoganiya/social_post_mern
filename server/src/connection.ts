import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3307,
  database: "social_media",
});

export default db;
