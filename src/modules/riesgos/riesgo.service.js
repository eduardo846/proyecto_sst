const pool = require("../../config/db");

exports.getAll = async (empresaId) => {
  const result = await pool.query(
    "SELECT * FROM riesgos WHERE empresa_id = $1",
    [empresaId]
  );
  return result.rows;
};

exports.create = async (data, empresaId) => {
  const {
    proceso,
    peligro,
    riesgo,
    nivel_probabilidad,
    nivel_consecuencia,
    nivel_riesgo
  } = data;

  const result = await pool.query(
    `INSERT INTO riesgos
     (proceso, peligro, riesgo, nivel_probabilidad,
      nivel_consecuencia, nivel_riesgo, empresa_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [proceso, peligro, riesgo, nivel_probabilidad, nivel_consecuencia, nivel_riesgo, empresaId]
  );

  return result.rows[0];
};

exports.update = async (id, data, empresaId) => {
  const { proceso, peligro, riesgo } = data;

  const result = await pool.query(
    `UPDATE riesgos
     SET proceso=$1, peligro=$2, riesgo=$3
     WHERE id=$4 AND empresa_id=$5
     RETURNING *`,
    [proceso, peligro, riesgo, id, empresaId]
  );

  return result.rows[0];
};

exports.remove = async (id, empresaId) => {
  const result = await pool.query(
    `DELETE FROM riesgos
     WHERE id=$1 AND empresa_id=$2
     RETURNING *`,
    [id, empresaId]
  );

  return result.rows[0];
};