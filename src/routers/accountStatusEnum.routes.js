var express = require("express");
var router = express.Router();

const accountStatusEnumController = require('../controllers/accountStatusEnumController');

router.get("/", accountStatusEnumController.getAllAccountStatusEnum);
router.get("/:id", accountStatusEnumController.getAccountStatusEnum);
router.post("/", accountStatusEnumController.addAccountStatusEnum);
router.patch("/:id", accountStatusEnumController.updateAccountStatusEnum);

module.exports = router;
