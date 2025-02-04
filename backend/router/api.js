const express = require('express');
const { Home } = require('../controllers/auth');
const { userCreate,showUsers,Login,deleteUser, updateUser } = require('../controllers/modelController');
const router = express.Router();


router.route('/').get(Home);
router.route('/create-users').post(userCreate);
router.route('/show-users').post(showUsers);
router.route('/login').post(Login);
router.route('/delete/:id').delete(deleteUser);
router.route('/update/:id').post(updateUser);

module.exports = router;