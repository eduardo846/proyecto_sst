const service = require("./capacitacion.service");

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getAll(req.user.empresaId);
    res.json(data);
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await service.getById(req.params.id, req.user.empresaId);

    if (!data) {
      return res.status(404).json({ error: "Capacitación no encontrada" });
    }

    res.json(data);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const data = await service.create(req.body, req.user.empresaId);
    res.status(201).json(data);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const data = await service.update(req.params.id, req.body, req.user.empresaId);

    if (!data) {
      return res.status(404).json({ error: "Capacitación no encontrada" });
    }

    res.json(data);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const data = await service.remove(req.params.id, req.user.empresaId);

    if (!data) {
      return res.status(404).json({ error: "Capacitación no encontrada" });
    }

    res.json({ message: "Capacitación eliminada" });
  } catch (e) { next(e); }
};

// asistencia
exports.registrarAsistencia = async (req, res, next) => {
  try {
    const data = await service.registrarAsistencia(
      req.params.id,
      req.body,
      req.user.empresaId
    );
    res.json(data);
  } catch (e) { next(e); }
};

exports.getAsistencia = async (req, res, next) => {
  try {
    const data = await service.getAsistencia(
      req.params.id,
      req.user.empresaId
    );
    res.json(data);
  } catch (e) { next(e); }
};