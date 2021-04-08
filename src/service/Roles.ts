import { NextFunction, Request, Response } from "express";
import AuthService from "../modules/_admin/auth/Auth.service";

export function Roles(role) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const userCode = req?.cookies?.Authentication || null
      const user: any = await AuthService.validate(userCode)

      if (user.roles === role) {
        next()
      } else {
        res.send({ code: 100, message: "Unauthorization" })
      }
    } catch (error) {
      res.send({ code: 500, message: error })
    }
  }
}