const pool = require("../../config/db");

exports.getAll = async (empresaId) => {
  const result = await pool.query(
    "SELECT * FROM empleados WHERE empresa_id = $1",
    [empresaId]
  );
  return result.rows;
};
/*
exports.create = async (data, empresaId) => {
  const { nombre, documento } = data;

  const result = await pool.query(
    `INSERT INTO empleados(nombre, documento, empresa_id)
     VALUES($1,$2,$3) RETURNING *`,
    [nombre, documento, empresaId]
  );

  return result.rows[0];
};
*/
exports.create = async (data, empresaId) => {
  const { nombre, documento } = data;

  try {
    const result = await pool.query(
      `INSERT INTO empleados (nombre, documento, empresa_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, documento, empresaId]
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      const err = new Error("Ya existe un empleado con ese número de documento");
      err.status = 409;
      throw err;
    }

    throw error;
  }
};

exports.getById = async (id, empresaId) => {
  const result = await pool.query(
    "SELECT * FROM empleados WHERE id = $1 AND empresa_id = $2",
    [id, empresaId]
  );

  return result.rows[0];
};
exports.update = async (id, data, empresaId) => {
  const { nombre, documento } = data;

  // validación básica
  if (!nombre || !documento) {
    throw new Error("Nombre y documento son obligatorios");
  }

  const result = await pool.query(
    `UPDATE empleados
     SET nombre = $1,
         documento = $2
     WHERE id = $3 AND empresa_id = $4
     RETURNING *`,
    [nombre, documento, id, empresaId]
  );

  return result.rows[0];
};

exports.remove = async (id, empresaId) => {
  const result = await pool.query(
    `DELETE FROM empleados
     WHERE id = $1 AND empresa_id = $2
     RETURNING *`,
    [id, empresaId]
  );

  return result.rows[0]; // undefined si no existe
};