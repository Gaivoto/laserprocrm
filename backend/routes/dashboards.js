const express = require('express');

const router = express.Router();

const cntrDash = require('../controllers/dashboards.js');

router.get("/", cntrDash.getAllDashboards);

router.put("/:id/toggle", cntrDash.toggleDashboard);

module.exports = router