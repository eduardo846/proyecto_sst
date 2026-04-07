const { Pool } = require("pg");

const pool = new Pool({
  user: "neondb_owner",
  host: "ep-divine-waterfall-anln40vd-pooler.c-6.us-east-1.aws.neon.tech",
  database: "neondb",
  password: "npg_a0AmPBzceH8y",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;