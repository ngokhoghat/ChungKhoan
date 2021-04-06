import { Request, Response } from "express";
import { Controller, Get, Post } from "../../../base/decorator/common.decorator";
import AuthService from "./Auth.service";

@Controller('/admin')
export default class AdminAuthController {
  @Get('/login')
  public login(req: Request, res: Response) {
    res.render('admin/login', { layout: 'admin.layout.login.hbs' })
  }

  @Post('/login')
  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body

    if (email && password) {
      const user = await AuthService.login({ email, password })

      if (user.length) {
        res.setHeader('Set-Cookie', `Authentication=admin; HttpOnly; Path=/; Max-Age=60000`);
        res.redirect('/admin')
      } else {
        res.render('admin/login', { layout: 'admin.layout.login.hbs' })
      }
    } else {
      res.render('admin/index', { layout: 'admin.layout.login.hbs' })
    }
  }

  @Post('/logout')
  public logout(req: Request, res: Response) {
    res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);
    res.render('admin/login', { layout: 'admin.layout.login.hbs' })
  }
}