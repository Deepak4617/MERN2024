const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const {signUpSchema,loginSchema} = require('../validators/authValidator');
const validate = require('../middleWare/validateMiddleWare');
const authMiddleware = require('../middleWare/authMiddleware');

router.route('/').get(authController.home)
router.route('/about').get(authController.about)
router
.route('/register')
.post(validate(signUpSchema), authController.register)
router
.route('/login')
.post(validate(loginSchema), authController.login)

router.route('/user').get(authMiddleware, authController.user);

module.exports = router;