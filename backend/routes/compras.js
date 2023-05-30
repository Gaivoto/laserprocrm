const express = require('express');

const router = express.Router();

const cntrComp = require('../controllers/compras.js');

router.get("/", cntrComp.getAllCompras);

router.post("/", cntrComp.createCompra);

router.put("/:id", cntrComp.editCompra);

router.delete("/:id", cntrComp.deleteCompra);

module.exports = router