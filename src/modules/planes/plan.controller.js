const service = require("./plan.service");

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
      return res.status(404).json({ error: "Plan no encontrado" });
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
      return res.status(404).json({ error: "Plan no encontrado" });
    }

    res.json(data);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const data = await service.remove(req.params.id, req.user.empresaId);

    if (!data) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }

    res.json({ message: "Plan eliminado" });
  } catch (e) { next(e); }
};