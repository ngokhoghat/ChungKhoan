import { Account } from "../../../data/entities/Accounts";

export default class AuthService {
  public static async login({ email, password }) {
    const user = await Account.findOne({ email, password })
    return user;
  }

  public static logout(securityCode) {
    return Account.updateOne({ securityCode: securityCode }, { securityCode: '' });
  }

  public static updateUser(id, securityCode) {
    return Account.updateOne({ _id: id }, { securityCode: securityCode })
  }

  public static validate(securityCode) {
    return Account.findOne({ securityCode }).lean()
  }
}