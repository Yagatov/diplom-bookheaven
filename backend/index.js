import express from 'express';
import init from './src/App.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

init(app);

app.listen(port, () => {
  console.log(`<*> Сервер запущен на порту ${port}`)
});