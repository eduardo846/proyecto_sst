const pool = require("../../config/db");

exports.getAll = async (empresaId) => {
  const result = await pool.query(
    "SELECT * FROM planes_accion WHERE empresa_id=$1",
    [empresaId]
  );
  return result.rows;
};

exports.getById = async (id, empresaId) => {
  const result = await pool.query(
    "SELECT * FROM planes_accion WHERE id=$1 AND empresa_id=$2",
    [id, empresaId]
  );
  return result.rows[0];
};

exports.create = async (data, empresaId) => {
  const { descripcion, responsable, fecha_inicio, fecha_fin } = data;

  const result = await pool.query(
    `INSERT INTO planes_accion
     (descripcion, responsable, fecha_inicio, fecha_fin, empresa_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [descripcion, responsable, fecha_inicio, fecha_fin, empresaId]
  );

  return result.rows[0];
};

exports.update = async (id, data, empresaId) => {
  const { descripcion, responsable } = data;

  const result = await pool.query(
    `UPDATE planes_accion
     SET descripcion=$1, responsable=$2
     WHERE id=$3 AND empresa_id=$4
     RETURNING *`,
    [descripcion, responsable, id, empresaId]
  );

  return result.rows[0];
};

exports.remove = async (id, empresaId) => {
  const result = await pool.query(
    `DELETE FROM planes_accion
     WHERE id=$1 AND empresa_id=$2
     RETURNING *`,
    [id, empresaId]
  );

  return result.rows[0];
};