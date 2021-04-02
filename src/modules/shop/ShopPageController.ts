import { Request, Response } from "express";
import { Controller, Get } from "../../base/decorator/common.decorator";

@Controller('/shop')
export default class ShopPageController {
    @Get('/')
    public index(req: Request, res: Response) {
        res.render('shop')
    }
}