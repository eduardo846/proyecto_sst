const router = require("express").Router();
const controller = require("./notificacion.controller");
const auth = require("../../middleware/auth.middleware");

router.get("/", auth, controller.getAll);
router.post("/", auth, controller.create);
router.put("/:id/leido", auth, controller.marcarLeido);

module.exports = router;