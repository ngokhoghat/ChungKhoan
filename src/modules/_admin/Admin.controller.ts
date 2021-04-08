import { Request, Response } from "express";
import { UseAuthen } from "../../base/decorator/auth.decorator";
import { UseAuthor } from "../../base/decorator/author.decorator";
import { Controller, Get } from "../../base/decorator/common.decorator";
import { AuthGuard } from "../../service/AuthGuard";
import { Roles } from "../../service/Roles";

@UseAuthen(AuthGuard)
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