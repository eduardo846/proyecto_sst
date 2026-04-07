const service = require("./auth.service");

exports.login = async (req, res) => {
  try {
    const data = await service.login(req.body);
    res.json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};