import { Request, Response } from "express";
import { Controller, Get, Post } from "../../base/decorator/common.decorator";
import AdminService from "./AdminService";

@Controller('/admin')
export default class AdminController {
  @Get('/')
  public index(req: Request, res: Response) {
    const user = req?.cookies.Authentication

    if (user) {
      res.render('admin', { layout: 'admin.layout.hbs' })
    } else {
      res.redirect('/admin/login')
    }
  }

  @Get('/login')
  public login(req: Request, res: Response) {
    res.render('admin.login.hbs', { layout: 'admin.layout.login.hbs' })
  }

  @Post('/login')
  public async userlogin(req: Request, res: Response) {
    const { email, password } = req.body

    if (email && password) {
      const user = await new AdminService().login({ email, password })

      if (user.length) {
        res.setHeader('Set-Cookie', `Authentication=admin; HttpOnly; Path=/; Max-Age=60000`);
        res.redirect('/admin')
      } else {
        res.render('admin.login.hbs', { layout: 'admin.layout.login.hbs' })
      }
    } else {
      res.render('admin.login.hbs', { layout: 'admin.layout.login.hbs' })
    }
  }

  @Post('/logout')
  public logout(req: Request, res: Response) {
    res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);
    res.render('admin.login.hbs', { layout: 'admin.layout.login.hbs' })
  }
}