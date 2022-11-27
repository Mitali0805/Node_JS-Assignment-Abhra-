const express = require('express');
const router = express.Router();

const {getAllUsers, addUser, getUserById, getUserByName} = require('../controller/user')

//routes
router.get('/users',getAllUsers);

router.get('/user/:id',getUserById);

router.get('/users/:name',getUserByName);

router.post('/user',addUser);

module.exports = router;
