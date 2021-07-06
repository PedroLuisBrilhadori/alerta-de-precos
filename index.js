const puppeteer = require('puppeteer');
const notifier = require('node-notifier');
let readline = require('readline-sync');

let acao = readline.question("insira qual ação você quer monitorar: ") || 'mglu3';
let minimo = readline.question("insira qual o preço minimo para notificação: ") || 21.00;
let url = `https://www.google.com/search?q=${acao}`;

async function pegarPreco(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const preco = await page.evaluate(() =>{
        return document.getElementsByClassName("IsqQVc NprOob")[0].innerText;
    });
    await page.screenshot({path: 'teste.png'});
    await browser.close();
    return preco;
}


async function mostrarPreco(){
    const preco = await pegarPreco();
    if(notificacao(preco) == true){
        new Promise(resolve => notifier.notify(preco)); 
        minimo =  readline.question("insira qual o preço minimo para notificação: ") || 21.00;
    }
    console.log(preco);    
}

function notificacao(preco){
    let n = preco.replace(',', '.')
    return n < minimo
}

async function* asyncGenerator() {
    var i = 0;
    while (i < 15) {
      yield i++;
    }
  }
  
(async function() {
  for await (let num of asyncGenerator()) {
      await mostrarPreco();
      await sleep(1700)
  }
})();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}