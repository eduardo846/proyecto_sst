const pool = require("../../config/db");

exports.getAll = async (empresaId) => {
  const result = await pool.query(
    "SELECT * FROM capacitaciones WHERE empresa_id=$1",
    [empresaId]
  );
  return result.rows;
};

exports.getById = async (id, empresaId) => {
  const result = await pool.query(
    "SELECT * FROM capacitaciones WHERE id=$1 AND empresa_id=$2",
    [id, empresaId]
  );
  return result.rows[0];
};

exports.create = async (data, empresaId) => {
  const { tema, descripcion, fecha } = data;

  const result = await pool.query(
    `INSERT INTO capacitaciones (tema, descripcion, fecha, empresa_id)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [tema, descripcion, fecha, empresaId]
  );

  return result.rows[0];
};

exports.update = async (id, data, empresaId) => {
  const { tema, descripcion } = data;

  const result = await pool.query(
    `UPDATE capacitaciones
     SET tema=$1, descripcion=$2
     WHERE id=$3 AND empresa_id=$4
     RETURNING *`,
    [tema, descripcion, id, empresaId]
  );

  return result.rows[0];
};

exports.remove = async (id, empresaId) => {
  const result = await pool.query(
    `DELETE FROM capacitaciones
     WHERE id=$1 AND empresa_id=$2
     RETURNING *`,
    [id, empresaId]
  );

  return result.rows[0];
};

// asistencia
exports.registrarAsistencia = async (capacitacionId, data, empresaId) => {
  const { empleado_id, asistio } = data;

  const result = await pool.query(
    `INSERT INTO asistencia_capacitacion
     (capacitacion_id, empleado_id, asistio, empresa_id)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (capacitacion_id, empleado_id)
     DO UPDATE SET asistio=$3
     RETURNING *`,
    [capacitacionId, empleado_id, asistio, empresaId]
  );

  return result.rows[0];
};

exports.getAsistencia = async (capacitacionId, empresaId) => {
  const result = await pool.query(
    `SELECT a.*, e.nombre
     FROM asistencia_capacitacion a
     JOIN empleados e ON e.id = a.empleado_id
     WHERE a.capacitacion_id=$1 AND a.empresa_id=$2`,
    [capacitacionId, empresaId]
  );

  return result.rows;
};