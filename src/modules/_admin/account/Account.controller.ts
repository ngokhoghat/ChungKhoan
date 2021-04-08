import { Request, Response } from "express";
import { UseAuthen } from "../../../base/decorator/auth.decorator";
import { UseAuthor } from "../../../base/decorator/author.decorator";
import { Controller, Get, Post } from "../../../base/decorator/common.decorator";
import { AuthGuard } from "../../../service/AuthGuard";
import { MailerService } from "../../../service/Mailer.service";
import { Roles } from "../../../service/Roles";
import AccountService from "./Account.service";

@UseAuthen(AuthGuard)
@UseAuthor(Roles('admin'))
@Controller('/admin/account')
export default class AdminAccountController {
  @Get('/')
  public async index(req: Request, res: Response) {
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
      .catch((err) => res.send(err))
  }

  @Get('/delete/:id')
  public async deleteAccount(req: Request, res: Response) {
    console.log(req.params.id);
    return res.send('Done')
    // return AccountService.delete(req.params.id)
    //   .then(() => res.redirect('back'))
    //   .catch(err => res.send(err))
  }
}