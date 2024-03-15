
import express from 'express';
import session from 'express-session';

import multicors from './utils/MultiCors.js';
import RouteManager from './routers/RouteManager.js';

import { ErrorHandler } from './Errors.js';

let app;

function init(fromApp) {
    app = fromApp;

    onStart();

    RouteManager(app);

    onEnd();
}

function onStart() {
    app.use(multicors(process.env.CORS.split(" - ")));
    app.use(express.json());
    app.use(session({
        secret: process.env.SESSION_KEY || "bookheaven",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 * 5
        }
    }));
}

function onEnd() {
    app.use(ErrorHandler)
}


export default init;