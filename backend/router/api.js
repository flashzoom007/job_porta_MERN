const express = require('express');
const { Home } = require('../controllers/auth');
const { getAllRecords, userCreate, Login, deleteUser, updateUser, updateShowUser, uploadFile, logLogin, deleteAllUsers } = require('../controllers/modelController');
const { processPlaylist } = require('../controllers/playlistDownload');
const { createComapny, deleteCompany, updateCompany, deleteCompanyProfile, createCompanyProfile , updateCompanyProfile, deleteJobProfile,createJobPosition } = require('../controllers/companyController')
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
router.route('/create-company-profile').post(createCompanyProfile );
router.route('/update-company-profile').post(updateCompanyProfile);
router.route('/create-job-position').post(createJobPosition);
// Patch API



// Delete API
router.route('/delete/:id').delete(deleteUser);
router.route('/delete-company/:id').delete(deleteCompany);
router.route('/delete-all-users').delete(deleteAllUsers);
router.route('/delete-company-profile/:id').delete(deleteCompanyProfile);
router.route('/delete-job-profile/:id').delete(deleteJobProfile);

module.exports = router;