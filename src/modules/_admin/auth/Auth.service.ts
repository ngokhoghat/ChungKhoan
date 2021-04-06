import { Account } from "../../../data/entities/Accounts";

export default class AuthService {
  public static async login({ email, password }) {
    const user = await Account.where({ email, password })

    return user;
  }

  public userLogin() {

  }

  public logout() {

  }
}