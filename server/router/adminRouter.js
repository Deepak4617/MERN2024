const express = require('express');

const adminController = require('../controller/adminController');
const authMiddleware = require('../middleWare/authMiddleware');

const adminMiddleware = require('../middleWare/adminMiddleware');
const router = express.Router();

router.route('/users').get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route('/users/:id').get(authMiddleware, adminMiddleware, adminController.getUserById);
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, adminController.updateUserById);
router.route('/contacts').get(adminController.getAllContacts);
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

module.exports = router;
