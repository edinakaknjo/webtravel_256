const express = require('express');
const router = express.Router();
const auth = require('../auth');
const userService = require('../services/user');

router.post('/register', userService.registerUser);
router.post('/login', userService.loginUser);
router.get('/users', auth.authenticate, auth.isAdmin, userService.vratiUsers);  
router.put('/deaktiviraj/:id', auth.authenticate, auth.isAdmin, userService.deaktivirajUser); 

module.exports = router;