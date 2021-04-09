import { Logger } from "../data/entities/Loggers";

export default class LoggerService {
  public static getAll() {
    return Logger.find()
      .populate('account')
      .populate('userSeen')
      .lean()
      .exec();
  }

  public static create(logger) {
    return Logger.create(logger);
  }
}