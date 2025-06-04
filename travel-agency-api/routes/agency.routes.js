const express = require("express");
const router = express.Router();
const agencyController = require("../controllers/agency.controller");
const singleFileUploaderMiddleware = require("../middlewares/simpleUploader");

router.get("/", agencyController.getAll);
router.post("/", agencyController.create);
router.get("/:id", agencyController.getOne);
router.post("/:id", singleFileUploaderMiddleware, agencyController.addImage);

module.exports = router;
