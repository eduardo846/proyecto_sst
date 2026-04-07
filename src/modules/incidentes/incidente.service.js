const pool = require("../../config/db");

exports.getAll = async (empresaId) => {
  const result = await pool.query(
    "SELECT * FROM incidentes WHERE empresa_id = $1",
    [empresaId]
  );
  return result.rows;
};

exports.getById = async (id, empresaId) => {
  const result = await pool.query(
    "SELECT * FROM incidentes WHERE id = $1 AND empresa_id = $2",
    [id, empresaId]
  );
  return result.rows[0];
};

exports.create = async (data, empresaId) => {
  const { empleado_id, tipo, descripcion, fecha, severidad } = data;

  const result = await pool.query(
    `INSERT INTO incidentes
     (empleado_id, tipo, descripcion, fecha, severidad, empresa_id)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [empleado_id, tipo, descripcion, fecha, severidad, empresaId]
  );

  return result.rows[0];
};

exports.update = async (id, data, empresaId) => {
  const { tipo, descripcion, severidad } = data;

  const result = await pool.query(
    `UPDATE incidentes
     SET tipo=$1, descripcion=$2, severidad=$3
     WHERE id=$4 AND empresa_id=$5
     RETURNING *`,
    [tipo, descripcion, severidad, id, empresaId]
  );

  return result.rows[0];
};

exports.remove = async (id, empresaId) => {
  const result = await pool.query(
    `DELETE FROM incidentes
     WHERE id=$1 AND empresa_id=$2
     RETURNING *`,
    [id, empresaId]
  );

  return result.rows[0];
};