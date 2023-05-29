const express = require('express');

const router = express.Router();

const cntrForn = require('../controllers/fornecedores.js');

router.get("/", cntrForn.getAllFornecedores);

router.post("/", cntrForn.createFornecedor);

router.put("/:id", cntrForn.editFornecedor);

router.put("/:id/toggle", cntrForn.toggleFornecedor);

module.exports = router