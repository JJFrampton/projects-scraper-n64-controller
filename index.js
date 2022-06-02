const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.nintendo.com/en-ca/store/products/nintendo-64-controller/');

  //await page.waitForSelector('span[data-testid="helperText"]')
  //let text = await page.$('span[data-testid="helperText"]')
  //text = (await text.getProperty('textContent')).jsonValue()
  //console.log(text)

  
  let searchText = 'p.cWuGKg.iqhwUx'
  await page.waitForSelector(searchText)
  let text = await page.$(searchText)
  text = await text.getProperty('innerHTML')
  text = await text.jsonValue()
  console.log(text)

  const textRegex = new RegExp('This item is currently unavailable');
  console.log(textRegex.test(text))

  let searchButton = 'button.goRNPN'
  await page.waitForSelector(searchButton)
  let button = await page.$(searchButton)
  button = await button.getProperty('innerHTML')
  button = await button.jsonValue()
  console.log(button)

  const buttonRegex = new RegExp('Sold out');
  console.log(buttonRegex.test(button))

  await page.screenshot({ path: 'n64-controller.png' });

  await browser.close();

})();
