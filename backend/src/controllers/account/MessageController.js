import { BadRequestError } from "../../Errors.js";
import AuthValidator from '../../validators/AuthValidator.js';
import { isProps } from "../../utils/ValidationUtils.js";
import MessageService from "../../services/account/MessageService.js";

class MessageController {
    static async create(req, res, next) {
        console.log("[D?] CartController.getAll");
        const auth = AuthValidator.check(req);
        if(auth) next(auth);

        if(!isProps(req.body, ["topic", "message"])) {
            return new BadRequestError(400, "Не указаны все поля.");
        }

        const { topic, message } = req.body;
        const user_id = req.session.user.id;

        try {
            MessageService.create(user_id, topic, message);
            res.send();
        } catch(error) {
            return next(new ServerError());
        }
    }
}

export default MessageController;