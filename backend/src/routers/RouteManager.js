import Router from "express";

import AuthRoutes from './AuthRoutes.js';
import AccountRoutes from './AccountRoutes.js';
import PagesRoutes from './PagesRoutes.js';
import AdminRoutes from './AdminRoutes.js';

function init(app) {
    const apiRouter = Router();

    app.use('/api', apiRouter);

    registerRouters(apiRouter);
}

function registerRouters(router) {
    router.use('/auth', AuthRoutes);
    router.use('/account', AccountRoutes);
    router.use('/pages', PagesRoutes);
    router.use('/admin', AdminRoutes);
}

export default init;