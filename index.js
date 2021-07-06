const puppeteer = require('puppeteer');
const notifier = require('node-notifier');
var readline = require('readline-sync');

let acao = readline.question("insira qual ação você quer monitorar: ") || 'mglu3';
let minimo = readline.question("insira qual o preço minimo para notificação: ") || 21.00;
let url = `https://www.google.com/search?q=${acao}`;

(async () =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const preco = await page.evaluate(() =>{
        return document.getElementsByClassName("IsqQVc NprOob")[0].innerText;
    });
    console.log(preco);    
    notificacao(preco) ? notifier.notify(preco) : null;
    await browser.close();
})(); 

function notificacao(preco){
    n = preco.replace(',', '.')
    return n < minimo
}