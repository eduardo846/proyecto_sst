const router = require("express").Router();
const controller = require("./documento.controller");
const auth = require("../../middleware/auth.middleware");

router.get("/", auth, controller.getAll);
router.post("/", auth, controller.create);
router.delete("/:id", auth, controller.remove);

module.exports = router;