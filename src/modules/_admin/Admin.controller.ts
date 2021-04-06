import { Request, Response } from "express";
import { Controller, Get, Post } from "../../base/decorator/common.decorator";

@Controller('/admin')
export default class AdminController {
  @Get('/')
  public index(req: Request, res: Response) {
    const user = req?.cookies.Authentication

    if (user) {
      res.render('admin/index', { layout: 'admin.layout.hbs' })
    } else {
      res.redirect('/admin/login')
    }
  }
}