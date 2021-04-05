import { Account } from "../../data/entities/Accounts";

export default class AdminService {
    constructor() {
    }

    public async login({ email, password }) {
        const user = await Account.where({ email: email, password: password }).lean().exec()

        return user;
    }
}