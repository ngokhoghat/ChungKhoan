import { Request, Response } from "express";
import { Controller, Get, Post } from "../../base/decorator/common.decorator";

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
    public userlogin(req: Request, res: Response) {
        res.setHeader('Set-Cookie', `Authentication=admin; HttpOnly; Path=/; Max-Age=60000`);
        res.render('admin.login.hbs', { layout: 'admin.layout.login.hbs' })
    }

    @Get('/logout')
    public logout(req: Request, res: Response) {
        res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);
        res.render('admin.login.hbs', { layout: 'admin.layout.login.hbs' })
    }
}