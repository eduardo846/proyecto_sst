const router = require("express").Router();
const controller = require("./empleado.controller");
const auth = require("../../middleware/auth.middleware");
const status = require("../../middleware/statusempleado");

router.get("/", auth, controller.getAll);
router.post("/", auth, controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove);

module.exports = router;