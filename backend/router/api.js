const express = require('express');
const { Home } = require('../controllers/auth');
const { userCreate, showUsers, Login, deleteUser, updateUser, updateShowUser, uploadFile, logLogin, deleteAllUsers } = require('../controllers/modelController');
const router = express.Router();

// Get API 
router.route('/').get(Home);
router.route('/update-show-users').get(updateShowUser);

// Post API
router.route('/create-users').post(userCreate);
router.route('/show-users').post(showUsers);
router.route('/login').post(Login);
router.route('/update-user').post(updateUser);
router.route('/log-login').post(logLogin);
router.route('/upload-file').post(uploadFile);

// Delete API
router.route('/delete/:id').delete(deleteUser);
router.route('/delete-all-users').delete(deleteAllUsers);

module.exports = router;