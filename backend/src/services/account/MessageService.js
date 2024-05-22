import { client } from "../../Database.js";

class MessageService {
    static async create(user_id, topic, message) {
        const result = await client.messages.create({
            data: { user_id, topic, message }
        });
        return result;
    }
}

export default MessageService;