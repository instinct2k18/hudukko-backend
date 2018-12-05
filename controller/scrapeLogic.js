const snapdealScrape = require('./snapdealLogic');
const flipkartScrape = require('./flipkartLogic');

const scrapeSnapdeal = (req, res) => {
    const product = req.query.product;
    const price = req.query.price;
    snapdealScrape.snapdeal(product, price, (results) =>
    {
        res.send(results);
    });
}

const scrapeFlipkart = (req, res) => {
    const product = req.query.product;
    const price = req.query.price;
    flipkartScrape.flipkart(product, price, (results) =>
    {
        res.send(results);
    });
}
exports.scrapeSnapdeal = scrapeSnapdeal;
exports.scrapeFlipkart = scrapeFlipkart;
