const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")


router.post("/google-signup", authController.postGoogleSignup);
module.exports = router;
