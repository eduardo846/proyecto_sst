const router = require("express").Router();
const controller = require("./plan.controller");
const auth = require("../../middleware/auth.middleware");

router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove);

module.exports = router;