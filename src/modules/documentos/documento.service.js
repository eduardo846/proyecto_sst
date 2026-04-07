const pool = require("../../config/db");

exports.getAll = async (empresaId) => {
  const result = await pool.query(
    "SELECT * FROM documentos WHERE empresa_id=$1",
    [empresaId]
  );
  return result.rows;
};

exports.create = async (data, empresaId) => {
  const { nombre, tipo, url } = data;

  const result = await pool.query(
    `INSERT INTO documentos (nombre, tipo, url, empresa_id)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [nombre, tipo, url, empresaId]
  );

  return result.rows[0];
};

exports.remove = async (id, empresaId) => {
  const result = await pool.query(
    `DELETE FROM documentos
     WHERE id=$1 AND empresa_id=$2
     RETURNING *`,
    [id, empresaId]
  );

  return result.rows[0];
};