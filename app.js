const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const snapdealRoutes = require('./routes/snapdeal');
const flipkartRoutes = require('./routes/flipkart');

//cors
app.use(cors({origin: '*'}));

//routes
app.use("/api/scrapeSnapdeal", snapdealRoutes);
app.use("/api/scrapeFlipkart", flipkartRoutes);


module.exports = app;