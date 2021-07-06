const puppeteer = require('puppeteer');

let url = 'https://www.google.com/search?q=mglu3';

(async () =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const preco = await page.evaluate(() =>{
        return document.getElementsByClassName("IsqQVc NprOob")[0].innerText;
    });
    console.log(preco);
    await page.screenshot({path: 'teste.png'});
    await browser.close();
})();

