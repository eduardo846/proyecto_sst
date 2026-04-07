const pool = require("../../config/db");

exports.getAll = async (empresaId) => {
  const result = await pool.query(
    "SELECT * FROM examenes_medicos WHERE empresa_id=$1",
    [empresaId]
  );
  return result.rows;
};

exports.getById = async (id, empresaId) => {
  const result = await pool.query(
    "SELECT * FROM examenes_medicos WHERE id=$1 AND empresa_id=$2",
    [id, empresaId]
  );
  return result.rows[0];
};

exports.create = async (data, empresaId) => {
  const { empleado_id, tipo, fecha, resultado } = data;

  const result = await pool.query(
    `INSERT INTO examenes_medicos
     (empleado_id, tipo, fecha, resultado, empresa_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [empleado_id, tipo, fecha, resultado, empresaId]
  );

  return result.rows[0];
};

exports.update = async (id, data, empresaId) => {
  const { tipo, resultado } = data;

  const result = await pool.query(
    `UPDATE examenes_medicos
     SET tipo=$1, resultado=$2
     WHERE id=$3 AND empresa_id=$4
     RETURNING *`,
    [tipo, resultado, id, empresaId]
  );

  return result.rows[0];
};

exports.remove = async (id, empresaId) => {
  const result = await pool.query(
    `DELETE FROM examenes_medicos
     WHERE id=$1 AND empresa_id=$2
     RETURNING *`,
    [id, empresaId]
  );

  return result.rows[0];
};