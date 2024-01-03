const express = require('express');

const router = express.Router();

const cntrUser = require('../controllers/users.js');

router.get("/", cntrUser.getAllUsers);

router.post("/", cntrUser.createUser);

router.put("/:id", cntrUser.editUser);

router.put("/:id/toggle", cntrUser.toggleUser);
 
module.exports = router