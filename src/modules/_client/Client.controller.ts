import { Request, Response } from "express";
import { Controller, Get } from "../../base/decorator/common.decorator";

@Controller('/')
export default class ClientController {
    @Get('/')
    public index(req: Request, res: Response) {
        res.render('client/index')
    }
}