const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");
const tokenMiddleware = require("../middleware/token");

router.get("/", tokenMiddleware.checkToken, userController.getAllUsers);

router.get(
  "/me",
  tokenMiddleware.checkToken,
  userController.getUserMetaByToken
);

router.get(
  "/usersmeta",
  tokenMiddleware.checkToken,
  userController.validate("getUsersMeta"),
  userController.getUsersMeta
);

router.post(
  "/me/update",
  tokenMiddleware.checkToken,
  userController.validate("updateMeta"),
  userController.updateMeta
);

router.get(
  "/:username",
  tokenMiddleware.checkToken,
  userController.getUserMetaByUsername
);

module.exports = router;
