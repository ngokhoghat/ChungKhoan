import { Account } from '../../../data/entities/Accounts';
import { makeid } from '../../../utils/stringGenerate';

export default class AccountService {
  public static async getAll(userCode: string) {
    return Account.find({ securityCode: { $ne: userCode } }).lean().exec();
  }

  public static async getById(id) {
    return Account.findById(id).lean().exec();
  }

  public static async create(imageFile, account) {
    let uploadPath: string;

    try {
      const newAccount = JSON.parse(JSON.stringify(account));

      uploadPath = './public/uploads/' + new Date().getTime() + imageFile.name;
      const imagePath = '/uploads/' + new Date().getTime() + imageFile.name;

      newAccount.imageLinks = imagePath;
      newAccount.displayName = account.firstName + account.lastName
      newAccount.password = makeid();

      return Account.create(newAccount).then(() => {
        return newAccount;
      })
    } catch (error) {
      return error;
    } finally {
      imageFile.mv(uploadPath, function (err) {
        if (err) return err;
      });
    }
  }

  public static async delete(id) {
    return Account.deleteOne({ _id: id });
  }
}