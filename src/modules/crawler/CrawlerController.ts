import { Request, Response } from "express";
import { Controller, Get } from "../../base/decorator/common.decorator";
import { PuppeteerService } from "../../service/PuppeteerService";

@Controller('/crawl')
export default class CrawlerController {
  @Get('/')
  public async index(req: Request, res: Response) {
    const puperteer = new PuppeteerService()
    return puperteer.start()
      .then(async () => {
        const link = await puperteer.handlePageEvent()
        res.send(link)
      });
  }

  @Get('/:name')
  public details(req: Request, res: Response) {
    return res.send(`You are looking at the profile of ${req.params.name}`);
  }
}