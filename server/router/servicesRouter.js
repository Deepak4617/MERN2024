const express = require("express");
const router = express.Router();
const services = require("../controller/serviceController");

router.route("/service").get(services);
module.exports = router;