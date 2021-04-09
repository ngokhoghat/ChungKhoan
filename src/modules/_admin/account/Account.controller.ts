import { NextFunction, Request, Response } from "express";
import { Controller, Get, Post, UseGlobal, UseMidlleware } from "../../../base/decorator/common.decorator";
import { actionType, DataType, handleSuccessRequest } from "../../../data/responseHandler";
import { AuthGuard } from "../../../service/AuthGuard";
import { MailerService } from "../../../service/Mailer.service";
import { Roles } from "../../../service/Roles";
import { SetAppData } from "../../../service/SetAppData";
import AccountService from "./Account.service";

@UseMidlleware(AuthGuard)
@UseMidlleware(Roles('admin'))
@UseGlobal(SetAppData)
@Controller('/admin/account')
export default class AdminAccountController {
  @Get('/')
  public async index(req: Request, res: Response, next: NextFunction) {
    const userCode = req?.cookies?.Authentication || null
    const accountList = await AccountService.getAll(userCode);

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
      .then((account) =>
        handleSuccessRequest(
          req,
          actionType.create,
          DataType.account,
          account
        ))
      .then((account) => {
        const { email, password, displayName } = account;
        const listAccoutUrl =
          req.protocol
          + '://' + req.get('host')
          + '/admin/account'

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
      .then(() =>
        res.render('admin/add-account-success',
          {
            layout: 'admin.layout.hbs',
            email: req.body.email,
            displayName: req.body.displayName
          }
        ))
      .catch((err) => res.send(err.toString()))
  }

  @Get('/delete/:id')
  public async deleteAccount(req: Request, res: Response) {
    return AccountService.delete(req.params.id)
      .then(() => res.redirect('/admin/account'))
      .catch(err => res.send(err))
  }
}