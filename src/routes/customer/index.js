const express = require("express");
const router = express.Router();

router.use("/location", require("./location.routes"));
router.use("/notify", require("./notify.routes"));

// Define customer routes here
router.use("/auth", require("./auth.routes"));
// router.use("/products", require("./product.routes"));
// router.use("/cart", require("./cart.routes"));
// router.use("/orders", require("./order.routes"));
// router.use("/profile", require("./profile.routes"));

module.exports = router;
