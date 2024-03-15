import { client } from "../Database.js";

class AuthService {
    static async registration(email, login, password) {
        const result = {
            client: null,
            error: null
        }

        try {
            result.client = await client.users.create({
                data: {
                    email,
                    login,
                    password
                },
                select: {
                    id: true,
                    role: true
                }
            })

        } catch (error) {
            result.error = error;
        }

        return result;
    }
}

export default AuthService;