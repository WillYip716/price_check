const puppeteer = require('puppeteer');
const $ = require('cheerio');

async function findItemPrices(item,store) {
    // prepare for headless chrome
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let url;
    // set user agent (override the default headless User Agent)
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    if(store === "frys"){
        url = "https://www.frysfood.com/search?query=" + escape(item) + "&searchType=suggestions&fulfillment=all";
    }
    else if(store === "safeway"){
        url = "https://www.safeway.com/shop/search-results.html?q="+ escape(item);
    }
    // go to Google home page
    await page.goto(url);

    // get the User Agent on the context of Puppeteer
    const content = await page.content();

    if(store === "frys"){
        console.log("contacting frys");
        $('div.ProductCard', content).each((index,element) => {
            let productName = $(element).find("h3");
            console.log($(productName[0]).text());
    
            let price = $(element).find("data.kds-Price");
            if(price[0]){
                console.log(price[0].attribs.value);
            }
            else{
                console.log("no found value");
            }
    
            let size = $(element).find("span[data-qa='cart-page-item-sizing']");
            console.log($(size[0]).text());
        });
    }
    else if(store === "safeway"){
        console.log("contacting safeway");

        let location = $(content).find("span.reserve-nav__current-instore-text");
        console.log($(location[0]).text());

        /*if($(location[0]).text() !== "1902 W Main St"){
            await page.click('button#openFulfillmentModalButton',{delay: 2000});
            await page.type('input.input-search', "85201",{delay: 2000});
            await page.keyboard.press('Enter',{delay: 2000});
            await page.click("a[aria-describedby='address_1717']",{delay: 2000});
        }   */
        
        $('div.card-body', content).each((index,element) => {
            let productName = $(element).find("h3");
            console.log($(productName[0]).text());
    
            let price = $(element).find("span.product-price");
            if(price[0]){
                console.log($(price[0]).text());
            }
            else{
                console.log("no found value");
            }
    
            let size = $(element).find("span.product-price-qty");
            console.log($(size[0]).text());
        });
    }
    
    // If everything correct then no 'HeadlessChrome' sub string on userAgent
    
    await browser.close();
}


findItemPrices("chicken thighs", "frys");
findItemPrices("chicken thighs", "safeway");