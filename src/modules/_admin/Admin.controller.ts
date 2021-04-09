import { Request, Response } from "express";
import { Controller, Get, UseMidlleware } from "../../base/decorator/common.decorator";
import { AuthGuard } from "../../service/AuthGuard";

@UseMidlleware(AuthGuard)
@Controller('/admin')
export default class AdminController {
  @Get('/')
  public index(req: Request, res: Response) {
    res.render('admin/index', { layout: 'admin.layout.hbs' })
  }
}