const https = require('https');
const cheerio = require('cheerio');

const flipkart = (product, price, cb) => {
	let inj = product+' below '+price;
	let urls = 'https://www.flipkart.com/search?sort=relevance&q=';
	https.get(urls+inj, (res) => {
		let html = '';
		let qp = price;
		res.on('data', chunk => {
			html +=chunk;
		});
		
		res.on('end', () => {
			const resultFlipkart = function(html) {
                const $ = cheerio.load(html);
                let result = [];
                //GET
                var url = $("#container > div > div > div > div > div > div > div > div > div > div > a").map(function()
                {
                    return $(this).map(function()
                    {
                        let lnk = $(this).attr("href");	//Link
                        if(lnk !== undefined || lnk != "")
                        return "https://www.flipkart.com"+lnk.trim();
                    }).get();        
                }).get();
                //OP
                url = new Set(url);
                let links = [];
                url.forEach(v => links.push(v));
                let noOfLinks = links.length;
                if(noOfLinks > 7)
                links = links.slice(0,8);
                else
                links = links.slice(0,noOfLinks);
                
                //GET
                let prices = $("#container > div > div > div > div > div > div > div > div > div > div > a > div > div").map(function()
                {
                    return $(this).map(function()
                    {
                        let p = $(this).first().text();	//Price
                        if(p.length)
                        {
                            return p.substring(1,p.length).trim().replace(",","");
                        }
                    }).get();        
                }).get();
                //OP
                let noOfPrices = prices.length;
                let p = [];
                if(noOfPrices > 7)
                {
                    let adj = [];
                    for(let i = 0; i < 8*3;i++)
                    {	
                        adj[i+1] = prices[i];
                    }
                    adj[0] = "#";
                    
                    
                    for(let i = 1 ; i < 8*3;)
                    {
                        p.push(adj[i]);
                        i += 3;
                    }
                }
                else
                {
                    let adj = [];
                    for(let i = 0; i < noOfPrices*3;i++)
                    {	
                        adj[i+1] = price[i];
                    }
                    adj[0] = "#";
                    
                    for(let i = 1 ; i < noOfPrices*3;)
                    {
                        p.push(adj[i]);
                        i += 3;
                    }
                }
                prices = p;
                
                //GET
                let title = $("#container > div > div > div > div > div > div > div > div > div > div > a > div > div > div > img").map(function()
                {
                    return $(this).map(function()
                    {
                        let tit = $(this).attr("alt");	//Title
                        if(tit !== undefined)
                        return tit;
                    }).get();
                }).get();
                //OP
                let noOfTitles = title.length;
                let titles = [];
                if( noOfTitles > 7)
                titles = title.slice(0, 8);
                else
                titles = title.slice(0, noOfTitles);
                
                numOfResults = Math.min(noOfLinks,noOfPrices,noOfTitles);
                let l = links.slice(0,numOfResults);
                p = prices.slice(0,numOfResults);
                let t = titles.slice(0,numOfResults);
                
                let i = [];
                for(let j = 0 ; j < numOfResults; j++)
                {
                    i.push("https://img1a.flixcart.com/www/promos/new/20150528-140547-favicon-retina.ico");
                }

                
                function zip() {
                    var args = [].slice.call(arguments);
                    var shortest = args.length==0 ? [] : args.reduce(function(a,b){
                        return a.length<b.length ? a : b
                    });
                    
                    return shortest.map(function(_,i){
                        return args.map(function(array){return array[i]})
                    });
                }
                
                zipped = zip(i,l,p,t);
                for(i = 0; i < zipped.length; i++)
                {
                    result.push({
                        "link" : zipped[i][1],
                        "image" : zipped[i][0],
                        "title":zipped[i][3],
                        "price":zipped[i][2]
                                });
                }
                return result;
            }
            cb(resultFlipkart(html));
        });
    });
}

exports.flipkart = flipkart;