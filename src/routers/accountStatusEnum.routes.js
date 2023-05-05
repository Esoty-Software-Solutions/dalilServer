const express = require("express");
const {authentication}= require("../utilities/auth")
// eslint-disable-next-line new-cap
const router = express.Router();

const accountStatusEnumController = require("../controllers/accountStatusEnumController");

router.get("/",authentication, accountStatusEnumController.getAllAccountStatusEnum);
router.get("/:id",authentication, accountStatusEnumController.getAccountStatusEnum);
router.post("/",authentication, accountStatusEnumController.addAccountStatusEnum);
router.patch("/:id",authentication, accountStatusEnumController.updateAccountStatusEnum);

module.exports = router;
