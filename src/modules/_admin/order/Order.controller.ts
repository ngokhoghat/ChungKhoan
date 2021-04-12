import { Request, Response } from "express";

import { Controller, Get, UseMidlleware } from "../../../base/decorator/common.decorator";
import { AuthGuard } from "../../../service/AuthGuard";

@UseMidlleware(AuthGuard)
@Controller('/admin/order')
export default class AdminOrderController {
  @Get('/')
  public async index(req: Request, res: Response) {
    res.render('admin/order', { layout: 'admin.layout.hbs' })
  }
}