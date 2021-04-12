import { Request } from "express";
import LoggerService from "../../service/Logger.service";

export enum actionType {
  create = 'create',
  update = 'update',
  delete = 'delete'
}

export enum DataType {
  product = 'product',
  account = 'account',
}

export const handleSuccessRequest = (
  req: Request,
  actionType: actionType,
  dataType: DataType,
  data: any
) => {
  const user = req?.app?.locals?.user || '';
  let dataDisplay: any = '';

  switch (dataType) {
    case DataType.product:
      dataDisplay = data.displayName;
      break;

    default:
      dataDisplay = data.displayName;
      break;
  }

  return LoggerService.create({
    account: user._id,
    action: actionType,
    dataType,
    dataDisplay
  }).then(() => data);
}
