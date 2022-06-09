# N64 Controller Availability Notifier (Site Scraper)

## Description
This project is designed to watch a site for changes to the html elements on the page. Changes are determined by a failing (loose) regex match, targeting any part of the element. If changes are found then an email notification is sent out along with a link to the site and the changed elements.

## Install
```
  npm install
```
## Local Run
```
  npm start
```
## Heroku Run
Using Heroku cli
```
  heroku scale web=0 run=1
```
Where "run" is an arbitrary tag mapped to a command defined in the Procfile

Need to scale "web" (default process) down to zero as web requires atrributes of a full server  
ie. a response a path '/', a binding to a port, etc

## Dependencies

#### Dotenv
Dotenv is used to simplify injection of environment variables during local runs, in production these would be pulled from the host machines environment.

[More](https://github.com/motdotla/dotenv#readme)

#### Puppeteer
Puppeteer is used to retrieve rendered elements on the final pages displayed.

Puppeteer is needed, rather than an xml parser, due to the numerous calls made by the recieved javascript from the initial call. For this specific site, the html that is initially retrieved does not include the required information. This initial html references scripts which are then retrieved and executed. Somewhere within the functions of these scripts (which have been minified / uglified), there are calls which retrieve the data that we do need. Puppeteer allows us to do all of this automatically as a browser would (Puppeteer = highlevel api to control headless chrome(ium) browser).

[More](https://github.com/puppeteer/puppeteer#readme)

#### Nodemailer
Nodemailer is used to send email notifications.

[More](https://nodemailer.com/about/)

## Other Resources

[Heroku process types](https://devcenter.heroku.com/articles/nodejs-support#default-web-process-type)

[Running puppeteer on heroku](https://stackoverflow.com/questions/52225461/puppeteer-unable-to-run-on-heroku)
