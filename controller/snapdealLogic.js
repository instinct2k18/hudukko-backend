const https = require('https');
const cheerio = require('cheerio');

const snapdeal = (prod, price, cb) => {
	let inj = prod+' below '+price;
	let urls = 'https://www.snapdeal.com/search?sort=rlvncy&keyword=';
	https.get(urls+inj, (res) => {
		let html = '';
		let qp = price;
		res.on('data', chunk => {
			html +=chunk;
		});
		
		res.on('end', () => {
			const resultSnapdeal = function(html) {
				const $ = cheerio.load(html);
				let result = [];
				var img = $("#products").map(function()
				{
					return $(this).find("picture > source").map(function()
					{
						return $(this).attr("srcset");
					}).get();        
				}).get();
				
				var tit = $("#products").map(function()
				{
					return $(this).find("div > a > picture > img").map(function()
					{
						return $(this).attr("title");
					}).get();        
				}).get();
				
				var links = $("#products").map(function()
				{
					return $(this).find("div > a").map(function()
					{
						return $(this).attr("href");
					}).get();        
				}).get();
				
				var price = $("#products").map(function()
				{
					return $(this).find("span:nth-of-type(2)").map(function()
					{
						return $(this).attr("data-price");
					}).get();        
				}).get();
				
				var link = new Set(links);
				
				var getEntriesArry = link.entries();
				
				let dmp = [],l;
				l = String(getEntriesArry.next().value);		
				l = l.substring(0,l.indexOf(","));
				dmp.push(l);
				l = String(getEntriesArry.next().value);		
				l = l.substring(0,l.indexOf(","));
				dmp.push(l);
				l = String(getEntriesArry.next().value);		
				l = l.substring(0,l.indexOf(","));
				dmp.push(l);
				l = String(getEntriesArry.next().value);		
				l = l.substring(0,l.indexOf(","));
				dmp.push(l);
				l = String(getEntriesArry.next().value);		
				l = l.substring(0,l.indexOf(","));
				dmp.push(l);
				l = String(getEntriesArry.next().value);		
				l = l.substring(0,l.indexOf(","));
				dmp.push(l);
				l = String(getEntriesArry.next().value);		
				l = l.substring(0,l.indexOf(","));
				dmp.push(l);
				l = String(getEntriesArry.next().value);		
				l = l.substring(0,l.indexOf(","));
				dmp.push(l);
				for(var i=0; i<8; i++)
				{
					if((price[i]<=qp*1.15 && price[i]>=0)){
						result.push({"link":dmp[i], "image": img[i], "title": tit[i], "price": price[i]});
					}
				}
				return result;
			}
			cb(resultSnapdeal(html));
		});
	});
};

exports.snapdeal = snapdeal;