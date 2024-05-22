import { client } from "../Database.js";

class AuthService {
    static async registration(email, login, password) {
        return await client.users.create({
            data: {
                email,
                login,
                password
            },
            select: {
                id: true,
                role: true
            }
        });
    }
}

export default AuthService;