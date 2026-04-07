const pool = require("../../config/db");
const jwt = require("jsonwebtoken");

exports.login = async ({ email, password }) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) throw new Error("Usuario no existe");

  if (String(user.password).trim() !== String(password).trim()) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign(
    { id: user.id, empresaId: user.empresa_id },
    "secret"
  );

  return { token };
};