import { Request, Response } from "express";
import { Controller, Get } from "../../base/decorator/common.decorator";
import { CronJobService } from "../../service/CronJobService";

@Controller('/cronjob')
export default class CronJobController {
    constructor() { }

    @Get('/start')
    start(req: Request, res: Response) {
        try {
            new CronJobService().start().then(() => {
                return res.send('OK')
            })

        } catch (error) {

        }
    }
}