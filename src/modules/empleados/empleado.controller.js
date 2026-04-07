const service = require("./empleado.service");

exports.getAll = async (req, res) => {
  const data = await service.getAll(req.user.empresaId);
  res.json(data);
};

/*
exports.create = async (req, res) => {
  const data = await service.create(req.body, req.user.empresaId);
  res.json(data);
};
*/
exports.create = async (req, res, next) => {
  try {
    const data = await service.create(req.body, req.user.empresaId);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};


exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empresaId = req.user.empresaId;

    const empleado = await service.getById(id, empresaId);

    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.json(empleado);

  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empresaId = req.user.empresaId;

    const empleado = await service.update(id, req.body, empresaId);

    // 👉 si no existe
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.json(empleado);

  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empresaId = req.user.empresaId;

    const eliminado = await service.remove(id, empresaId);

    // 👉 si no existe
    if (!eliminado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado eliminado correctamente" });

  } catch (error) {
    next(error);
  }
};