const express = require('express');

const router = express.Router();

const cntrPess = require('../controllers/pessoas.js');

router.post("/", cntrPess.createPessoa);

router.put("/:id", cntrPess.editPessoa);

router.put("/:id/toggle", cntrPess.togglePessoa);

module.exports = router