import * as puppeteer from 'puppeteer'
import { Constain } from '../shared/constain';

export class PuppeteerService {
  page: puppeteer.Page;
  browser: puppeteer.Browser;

  constructor() { }

  async start() {
    this.browser = await puppeteer.launch({ headless: false });
    // this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async handleLoginPage() {
    await this.page.goto(Constain.targetUrl);
    await (await this.page.$('#email')).type(Constain.email)
    await (await this.page.$('#pass')).type(Constain.password)
    await (await (await this.page.$('._featuredLogin__formContainer'))
      .evaluate(form => form.submit()))
  }

  async handlePageEvent() {
    await this.page.goto(Constain.targetUrl);
    await this.page.waitForSelector('a')
    const links = await this.page.evaluate(() => {
      setTimeout(() => {
        window.scrollTo(0, 5000)
      }, 3000);
      return Array.from(document
        .querySelectorAll('a'))
        .map(item => item.href.trim())
    })

    return links;
  }

  async handleGetData() {
    // const newFeed await page.evaluate()
  }

  async autoScroll() {
    await this.page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        try {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve('');
            }
          }, 100);
        } catch (error) {
          reject
        }
      });
    });
  }
}