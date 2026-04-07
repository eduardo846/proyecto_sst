const router = require("express").Router();
const controller = require("./empresa.controller");

// registro (público)
router.post("/register", controller.register);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;