import { Request, Response } from "express";

import { Controller, Get, Post } from "../../../base/decorator/common.decorator";
import { MailerService } from "../../../service/Mailer.service";
import AccountService from "./Account.service";

@Controller('/admin/account')
export default class AdminAccountController {
  @Get('/')
  public async index(req: Request, res: Response) {
    const accountList = await AccountService.getAll();

    res.render('admin/account', { layout: 'admin.layout.hbs', accountList })
  }

  @Get('/create')
  public async createAccountPage(req: Request, res: Response) {
    res.render('admin/add-account', { layout: 'admin.layout.hbs' })
  }

  @Post('/create')
  public async createAccount(req: Request | any, res: Response) {
    const imageFile = await req?.files?.image;

    const mailer = new MailerService();

    return AccountService.create(imageFile, req.body)
      .then((account) => {
        const { email, password, displayName } = account;
        const listAccoutUrl =
          req.protocol
          + '://' + req.get('host')
          + 'account'

        return mailer.sendMail({
          from: 'ngokhoghat@gmail.com',
          to: email,
          title: 'Create Success',
          content: `
            <p><b>Hi ${displayName}</b></p>
            <p>Your password is <b>${password}</b></p>
            <a href=""></a>
            <a href='${listAccoutUrl}'>Go to account Page</a>
          `
        })
      })
      .then(() => res.render('admin/add-account-success', { layout: 'admin.layout.hbs' }))
      .catch((err) => res.send(err))
  }
}