import { Request, Response } from "express"
import { Controller, Get } from "../../base/decorator/common.decorator"
import { Account } from "../../data/entities/Accounts"

@Controller('/cart')
export default class CartController {
    constructor() { }

    @Get("/")
    async index(req: Request, res: Response) {
        const listAccount = await Account.find();
        res.send(listAccount)
    }
}