import Router from "express";

import AuthRoutes from './AuthRoutes.js';

function init(app) {
    const apiRouter = Router();

    app.use('/api', apiRouter);

    registerRouters(apiRouter);
}

function registerRouters(router) {
    router.use('/auth', AuthRoutes);
}

export default init;