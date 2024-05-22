import Routes from "../Routes.js";

import AuthController from "../../controllers/AuthController.js";

class AuthRoutes extends Routes {
    _register() {
        this.router.post('/registration', AuthController.registration);
        this.router.post('/login', AuthController.login);
        this.router.post('/logout', AuthController.logout);
        this.router.get('/check', AuthController.check);
    }
}

export default AuthRoutes;