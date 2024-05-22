import { Router } from 'express';

class Routes {
    constructor(router, url) {
        this.router = Router();
        this.parentRouter = router;
        this.parentRouter.use(url, this.getRouter());

        this._register();
    }

    getRouter() {
        return this.router;
    }

    _register() {}
}

export default Routes;