const express = require("express");
const router = express.Router();
const registrationController = require("../../controller/registrationController");
const {emailVerficationController, verificationController} = require("../../controller/emailVerificationController");
const loginController = require("../../controller/loginController");

router.post('/registration', registrationController);
router.post('/verification', emailVerficationController);
router.post('/login', loginController);
router.get('/emailverification/:id',verificationController )


module.exports = router;