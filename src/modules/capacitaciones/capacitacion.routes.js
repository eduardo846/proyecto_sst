const router = require("express").Router();
const controller = require("./capacitacion.controller");
const auth = require("../../middleware/auth.middleware");

router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove);

// asistencia
router.post("/:id/asistencia", auth, controller.registrarAsistencia);
router.get("/:id/asistencia", auth, controller.getAsistencia);

module.exports = router;