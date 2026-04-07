const pool = require("../../config/db");
const bcrypt = require("bcrypt");

exports.register = async (data) => {
  const { nombre, nit, email, password, plan } = data;

  // 🔍 validar NIT único
  const existe = await pool.query(
    "SELECT id FROM empresas WHERE nit = $1",
    [nit]
  );

  if (existe.rows.length > 0) {
    throw new Error("La empresa ya existe con ese NIT");
  }

  // 1️⃣ crear empresa (usa tu estructura real)
  const empresaResult = await pool.query(
    `INSERT INTO empresas (nombre, nit, plan)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [nombre, nit, plan || "basico"]
  );

  const empresa = empresaResult.rows[0];

  // 2️⃣ encriptar password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ crear usuario admin
  const usuarioResult = await pool.query(
    `INSERT INTO usuarios (nombre, email, password, rol, empresa_id)
     VALUES ($1,$2,$3,'admin',$4)
     RETURNING id, nombre, email, rol`,
    [nombre, email, hashedPassword, empresa.id]
  );

  const usuario = usuarioResult.rows[0];

  return {
    empresa,
    usuario
  };
};

exports.getAll = async () => {
  const result = await pool.query("SELECT * FROM empresas");
  return result.rows;
};


exports.getById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM empresas WHERE id = $1",
    [id]
  );

  return result.rows[0]; // undefined si no existe
};
exports.update = async (id, data) => {
  const { nombre, plan, estado } = data;

  const result = await pool.query(
    `UPDATE empresas
     SET nombre = $1,
         plan = $2,
         estado = $3
     WHERE id = $4
     RETURNING *`,
    [nombre, plan, estado, id]
  );

  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await pool.query(
    `DELETE FROM empresas
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};