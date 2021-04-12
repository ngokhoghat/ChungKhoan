import { NextFunction, Request, Response } from "express";
import CategoriesService from "../modules/_admin/category/Category.service";
import LoggerService from "./Logger.service";

export async function SetAppData(req: Request, res: Response, next: NextFunction) {
  try {
    const loggers: any = await LoggerService.getAll();
    const categories: any = await CategoriesService.getAll();

    req.app.locals.loggers = loggers;
    req.app.locals.categories = categories;

    next()
    // res.send(loggers)
  } catch (error) {
    res.send({ code: 500, message: error.toString() })
  }
}