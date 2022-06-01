const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.nintendo.com/en-ca/store/products/nintendo-64-controller/');

  await page.waitForSelector('span[data-testid="helperText"]')
  let text = await page.$('span[data-testid="helperText"]')
  text = (await text.getProperty('textContent')).jsonValue()
  console.log(text)

  await page.waitForSelector('button.goRNPN')
  let button = await page.$('button.goRNPN')
  let inner = await button.getProperty('innerHTML')
  inner = await inner.jsonValue()
  console.log(inner)

  await page.screenshot({ path: 'n64-controller.png' });

  await browser.close();

})();
