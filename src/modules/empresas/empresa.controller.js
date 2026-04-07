const service = require("./empresa.service");

exports.register = async (req, res, next) => {
  try {
    const data = await service.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const empresa = await service.getById(id);

    if (!empresa) {
      return res.status(404).json({
        error: "Empresa no encontrada"
      });
    }

    res.json(empresa);

  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const empresa = await service.update(id, req.body);

    if (!empresa) {
      return res.status(404).json({
        error: "Empresa no encontrada"
      });
    }

    res.json(empresa);

  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const empresa = await service.remove(id);

    if (!empresa) {
      return res.status(404).json({
        error: "Empresa no encontrada"
      });
    }

    res.json({
      message: "Empresa eliminada correctamente"
    });

  } catch (error) {
    next(error);
  }
};