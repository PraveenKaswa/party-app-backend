const express = require("express");
const router = express.Router();

router.use("/settings", require("./settings.routes"));

// Define admin routes here
// router.use("/auth", require("./auth.routes"));
// router.use("/products", require("./product.routes"));
// router.use("/users", require("./user.routes"));

module.exports = router;
