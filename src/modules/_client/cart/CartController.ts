import { Request, Response } from "express"
import { Controller, Get, Post } from "../../../base/decorator/common.decorator";
@Controller('/cart')
export default class CartController {
    constructor() { }

    @Get("/")
    async index(req: Request | any, res: Response) {
        const cartList = await req.session.cartList;

        return res.render('client/cart', { cartList })
    }

    @Post("/addToCard")
    addToCard(req: Request, res: Response) {
        return res.render('client/shop')
    }
}