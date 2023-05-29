const express = require('express');

const router = express.Router();

const cntrMate = require('../controllers/materiais.js');

router.get("/", cntrMate.getAllMateriais);

router.post("/", cntrMate.createMaterial);

router.put("/:id", cntrMate.editMaterial);

router.put("/:id/toggle", cntrMate.toggleMaterial);

module.exports = router