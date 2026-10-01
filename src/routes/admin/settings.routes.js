const express = require("express");
const router = express.Router();
const settingsController = require("../../controllers/admin/settings.controller");

router.get("/delivery", settingsController.getDeliverySettings);
router.post("/delivery", settingsController.updateDeliverySettings);

module.exports = router;
