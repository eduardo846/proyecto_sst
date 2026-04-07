const pool = require("../../config/db");

exports.getAll = async (empresaId) => {
  const result = await pool.query(
    "SELECT * FROM notificaciones WHERE empresa_id=$1 ORDER BY created_at DESC",
    [empresaId]
  );
  return result.rows;
};

exports.create = async (data, empresaId) => {
  const { mensaje } = data;

  const result = await pool.query(
    `INSERT INTO notificaciones (mensaje, empresa_id)
     VALUES ($1,$2)
     RETURNING *`,
    [mensaje, empresaId]
  );

  return result.rows[0];
};

exports.marcarLeido = async (id, empresaId) => {
  const result = await pool.query(
    `UPDATE notificaciones
     SET leido=true
     WHERE id=$1 AND empresa_id=$2
     RETURNING *`,
    [id, empresaId]
  );

  return result.rows[0];
};