
import express from 'express';
import session from 'express-session';
import fileUpload from 'express-fileupload';

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
    app.use('/public', express.static('public'));
    app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    }));
}

function onEnd() {
    app.use(ErrorHandler)
}


export default init;