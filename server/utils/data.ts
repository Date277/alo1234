import mysql from "mysql2/promise";

const pool = mysql.createPool({
  database: "shopping_project",
  user: "root",
  password: "haianh123",
  host: "localhost",
  port: 3306,
});

export default pool;
