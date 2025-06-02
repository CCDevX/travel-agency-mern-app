const express = require("express");
const router = express.Router();
const agencyController = require("../controllers/agency.controller");

router.get("/", agencyController.getAll);
router.post("/", agencyController.create);
router.get("/:id", agencyController.getOne);
router.post("/:id", agencyController.addImage);

module.exports = router;
