const express = require('express');
var scrapeLogic = require('../controller/scrapeLogic.js');


const router = express.Router();

router.route('').get(scrapeLogic.scrapeSnapdeal);

module.exports = router;