const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "aplicacion",
  password: "T3mporal03",
  port: 5432
});

module.exports = pool;