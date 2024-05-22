import { client } from "../Database.js";

class AccountService {
    static async getUserById(id) {
        const result = await client.users.findUnique({
            where: { id }
        })
        return result;
    }

    static async getUserByLogin(login) {
        const result = await client.users.findUnique({
            where: { login }
        })
        return result;
    }

    static async updateUser(id, login, email, password, avatar) {
        const result = await client.users.update({
            where: { id },
            data: { login, email, password, avatar },
            select: {
                id: true,
                email: true,
                login: true,
                role: true
            }
        })
        return result;
    }

    static async updateBonus(id, bonus) {
        const result = await client.users.update({
            where: { id },
            data: { bonus },
            select: {
                id: true,
                email: true,
                login: true,
                role: true,
                bonus: true
            }
        })
        return result;
    }
}

export default AccountService;