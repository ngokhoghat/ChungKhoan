export interface loggerParams {
  userName: string;
  result: string;
  action: LoggerAcction;
}

export enum LoggerAcction {
  create = 'create',
  update = 'update',
  delete = 'delete'
}

export class LoggerMessage {
  userName: string;
  result: string;
  action: LoggerAcction;

  constructor({ userName, result, action }: loggerParams) {
    this.userName = userName;
    this.result = result;
    this.action = action;
  }

  public getMessage() {
    return this.userName + this.action + this.result
  }
}