import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import AuthValidator from '../../validators/AuthValidator.js';
import AccountService from "../../services/AccountService.js";

import { publicAvaDir } from '../../../public.js';
import { ServerError } from '../../Errors.js';

class ProfileController {
    static async get(req, res, next) {
        console.log("[D?] ProfileController.get");
        const auth = AuthValidator.check(req);
        if(auth) next(auth);

        try {
            const { id, email, login, role, bonus, avatar } = await AccountService.getUserById(req.session.user.id);

            res.send({
                id,
                email,
                login,
                role,
                bonus,
                avatar
            });
        } catch(error) {
            return next(new ServerError());
        }
    }

    static async set(req, res, next) {
        console.log("[D?] ProfileController.set");
        const auth = AuthValidator.check(req);
        if(auth) next(auth);

        const { email: newEmail, login: newLogin, password: newPassword } = req.body;
        const ava = req.files?.ava;

        let avatar = undefined;

        if(ava != undefined) {
            try {
                avatar = uuidv4() + path.extname(ava.name);
                ava.mv(path.join(publicAvaDir, avatar));
            } catch(error) {
                return next(new ServerError());
            }
        }

        try {
            const { id, email, login, role } = await AccountService.updateUser(req.session?.user?.id, newLogin, newEmail, newPassword, avatar);

            req.session.user = { id, login, role }
            
            res.send({ user: { login, email } });
        } catch (error) {
            return next(new ServerError());
        }
    }
}
export default ProfileController;