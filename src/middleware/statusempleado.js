module.exports = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    ok: false,
    message: err.message || "Error interno del servidor"
  });
};