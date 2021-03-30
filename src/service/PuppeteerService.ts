import * as puppeteer from 'puppeteer'
import { Constain } from '../shared/constain';

export class PuppeteerService {
  constructor() { }

  async start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await this.handlePageEvent(page);
  }

  async handleLoginPage(page: puppeteer.Page) {
    await page.goto(Constain.targetUrl);
    await (await page.$('#email')).type(Constain.email)
    await (await page.$('#pass')).type(Constain.password)
    await (await (await page.$('._featuredLogin__formContainer'))
      .evaluate(form => form.submit()))
  }

  async handlePageEvent(page: puppeteer.Page) {
    await page.goto(Constain.targetUrl);

  }

  async autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }
}