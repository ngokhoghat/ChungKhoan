import { Request, Response } from "express";
import * as CryptoJS from 'crypto-js'

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

      if (user) {
        const securityCode = CryptoJS.HmacMD5(user.toString(), process.env.SECRET_KEY).toString();

        return AuthService.updateUser(user._id, securityCode)
          .then(() => {
            res.setHeader('Set-Cookie', `Authentication=${securityCode}; HttpOnly; Path=/; Max-Age=6000`);
            return res.redirect('/admin')
          })
          .catch((err) => res.send(JSON.stringify(err)))

      } else {
        res.render('admin/login', { layout: 'admin.layout.login.hbs' })
      }
    } else {
      res.render('admin/index', { layout: 'admin.layout.login.hbs' })
    }
  }

  @Post('/logout')
  public async logout(req: Request, res: Response) {
    const userCode = req?.cookies?.Authentication || null;

    return AuthService.logout(userCode)
      .then((user) => {
        return res.render('admin/login', { layout: 'admin.layout.login.hbs' })
      })
      .catch(() => res.render('admin/login', { layout: 'admin.layout.login.hbs' }))
  }
}