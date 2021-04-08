import { Application, NextFunction, Request, Response } from "express";
import AuthService from "../modules/_admin/auth/Auth.service";

export async function AuthGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userCode = req?.cookies?.Authentication || null
    const user = await AuthService.validate(userCode)

    if (!user) {
      res.redirect('/admin/login')
    } else {
      req.app.locals.user = user
      next()
    }
  } catch (error) {
    res.send({ code: 500, message: error })
  }
}