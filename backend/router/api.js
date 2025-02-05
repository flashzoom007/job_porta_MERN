const express = require('express');
const { Home } = require('../controllers/auth');
const { userCreate, showUsers, Login, deleteUser, updateUser, updateShowUser, uploadFile } = require('../controllers/modelController');
const router = express.Router();

// GET API 
router.route('/').get(Home);
router.route('/update-show-users').get(updateShowUser);

// POST API
router.route('/create-users').post(userCreate);
router.route('/show-users').post(showUsers);
router.route('/login').post(Login);
router.route('/delete/:id').delete(deleteUser);
router.route('/update-user').post(updateUser);
// router.route('/upload-file').post(uploadFile);
router.post('/upload-file', (req, res) => {
    uploadFile(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: 'File upload failed', statusCode: 500 });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded', statusCode: 400 });
        }

        // Send response with uploaded file info
        res.json({ 
            message: 'File uploaded successfully', 
            fileName: req.file.filename,
            statusCode: 200 
        });
    });
});

module.exports = router;