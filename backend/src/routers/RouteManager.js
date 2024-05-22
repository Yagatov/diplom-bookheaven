import { Router } from "express";

import LandingRoutes from './routes/LandingRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import AccountRoutes from './routes/AccountRoutes.js';
import AdminRoutes from './routes/AdminRoutes.js';

class RouteManager {
    constructor(app, url) {
        this.app = app;
        this.router = Router();
        this.list = [];
        
        this.app.use(url, this.router);

        this._register();
    }

    _register() {
        this.list.push(
            new LandingRoutes(this.router, '/pages'),
            new AuthRoutes(this.router, '/auth'),
            new AccountRoutes(this.router, '/account'),
            new AdminRoutes(this.router, '/admin')
        );
    }

    getCount() {
        return this.list.length;
    }
}

export default RouteManager;