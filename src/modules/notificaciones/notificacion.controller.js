const service = require("./notificacion.service");

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getAll(req.user.empresaId);
    res.json(data);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const data = await service.create(req.body, req.user.empresaId);
    res.status(201).json(data);
  } catch (e) { next(e); }
};

exports.marcarLeido = async (req, res, next) => {
  try {
    const data = await service.marcarLeido(req.params.id, req.user.empresaId);

    if (!data) {
      return res.status(404).json({ error: "Notificación no encontrada" });
    }

    res.json(data);
  } catch (e) { next(e); }
};