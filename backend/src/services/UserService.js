import { client } from "../Database.js";

class UserService {
    static async getUserById(id) {
        const result = await client.users.findUnique({
            where: {
                id
            }
        })
        return result;
    }

    static async getUserByLogin(login) {
        const result = await client.users.findUnique({
            where: {
                login
            }
        })
        return result;
    }
}

export default UserService;