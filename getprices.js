const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.frysfood.com/search?query=honey%20nut%20cheerios&searchType=suggestions&fulfillment=all';

(async () => {
    // prepare for headless chrome
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // set user agent (override the default headless User Agent)
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // go to Google home page
    await page.goto(url);

    // get the User Agent on the context of Puppeteer
    const content = await page.content();
    $('div.ProductCard', content).each((index,element) => {
        console.log(index);
    });
    // If everything correct then no 'HeadlessChrome' sub string on userAgent
    

    await browser.close();
})();
