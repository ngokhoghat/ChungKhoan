import { NextFunction, Request, Response } from "express";
import LoggerService from "./Logger.service";

export async function SetAppData(req: Request, res: Response, next: NextFunction) {
  try {
    const loggers = await LoggerService.getAll();
    req.app.locals.loggers = loggers;

    // next()
    res.send(loggers)
  } catch (error) {
    res.send({ code: 500, message: error.toString() })
  }
}