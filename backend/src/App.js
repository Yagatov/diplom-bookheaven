
import express from 'express';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import FileStore from 'session-file-store';

import multicors from './utils/MultiCors.js';
import RouteManager from './routers/RouteManager.js';

import { ErrorHandler } from './Errors.js';

let app;


function init(fromApp) {
    app = fromApp;

    onEnable();
 
    const routeManager = new RouteManager(app, '/api');   
    console.log('[!] Загружено ' + routeManager.getCount() + ' глобальных роутов');

    onDisable();
}

function onEnable() {
    app.use(multicors(process.env.CORS.split(" - ")));
    app.use(express.json());

    const FileSession = FileStore(session);
    app.use(session({
        secret: process.env.SESSION_KEY || "bookheaven",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 * 5
        },
        store: new FileSession({ path: './sessions' })
    }));

    app.use('/public', express.static('public'));
    app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    }));
}

function onDisable() {
    app.use(ErrorHandler)
}


export default init;