let minutes = 15
let waitTime = minutes * 60 * 1000
setInterval(async () => {

  log("STARTING SCRIPT")

  function log(msg) {
    let d = new Date()
    let zone = d.getTimezoneOffset() / 60
    d.setHours(d.getHours() - zone)
    d = d.toISOString()
    d = d.split('.')[0]
    msg = `${d} - ${msg}`
    console.info(msg)
  }

  const puppeteer = require('puppeteer');
  require('dotenv').config()
  // Pass can be generated from uk google account	
  // under security > Signing in to google
  // https://myaccount.google.com/
  const toUser = process.env.TO_USER
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_PASS
  var nodemailer = require('nodemailer');

  let url = 'https://www.nintendo.com/en-ca/store/products/nintendo-64-controller/'
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  let sameButton = true
  let sameText = true
  let button, text
  try {
    let searchText = 'p.cWuGKg.iqhwUx'
    await page.waitForSelector(searchText)
    text = await page.$(searchText)
    text = await text.getProperty('innerHTML')
    text = await text.jsonValue()
    // console.log(text)
  
    const textRegex = new RegExp('This item is currently unavailable');
    sameText = textRegex.test(text)
    log("Text has changed : " + !sameText)
    if (!sameText) {throw new Error("Text has changed : " + !sameText)}
  
    let searchButton = 'button.goRNPN'
    await page.waitForSelector(searchButton)
    button = await page.$(searchButton)
    button = await button.getProperty('innerHTML')
    button = await button.jsonValue()
    // console.log(button)
  
    //const buttonRegex = new RegExp('Sold out');
    const buttonRegex = new RegExp('Available');
    sameButton = buttonRegex.test(button)
    log("Button has changed : " + !sameButton)
    if (!sameButton) {throw new Error("Button has changed : " + !sameButton)}
  
    await page.screenshot({ path: 'n64-controller.png' });
  
  } catch(e) {

    log("Sending email")
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      }
    });
    
    var mailOptions = {
      // from: testAccount.user,
      from: user,
      to: toUser,
      subject: 'N64 Controller Might Be Available Now !',
      text: `One of the following elements being tracked on the page has changed, or an error was encountered during parsing.
Button changed : ${!sameButton}
Button : \n${button}
Text changed : ${!sameText}
Text : \n${text}
Errors below\n${e}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        log("Email failed - " + error);
      } else {
        log("Email sent - " + info.response);
      }
    });

    // Send discord message
  }

  await browser.close();


  

}, waitTime);
