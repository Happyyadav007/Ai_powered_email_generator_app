const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "draft/" });
const { saveDraft, getUserDrafts, deleteDraft } = require("../controller/draftController");
const { generateEmail } = require("../controller/generateEmail");


router.post("/generate-email", generateEmail);

// Save Draft
router.post("/save-draft", upload.array("attachments"), saveDraft);

module.exports = router;