const express = require('express');
var scrapeLogic = require('../controller/scrapeLogic.js');


const router = express.Router();

router.route('').get(scrapeLogic.scrapeFlipkart);

module.exports = router;