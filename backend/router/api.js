const express = require('express');
const { Home } = require('../controllers/auth');
const { getAllRecords, userCreate, Login, deleteUser, updateUser, updateShowUser, uploadFile, logLogin, deleteAllUsers } = require('../controllers/modelController');
const { processPlaylist } = require('../controllers/playlistDownload');
const { createComapny, deleteCompany, updateCompany } = require('../controllers/companyController')
const router = express.Router();

// Get API 
router.route('/').get(Home);
router.route('/update-show-users').get(updateShowUser);
router.get('/show-:table', getAllRecords);

// Post API
router.route('/create-users').post(userCreate);
router.route('/login').post(Login);

router.route('/log-login').post(logLogin);
router.route('/update-user').post(updateUser);
router.route('/upload-file').post(uploadFile);
router.route('/playlist-download').post(processPlaylist);
router.route('/create-company').post(createComapny);
router.route('/update-company').post(updateCompany);

// Patch API



// Delete API
router.route('/delete/:id').delete(deleteUser);
router.route('/delete-company/:id').delete(deleteCompany);
router.route('/delete-all-users').delete(deleteAllUsers);

module.exports = router;