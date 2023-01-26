import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';


dotenv.config();

import './core/db.js';
import createRoutes from './core/routes.js';
import createSocket from './core/socket.js';

const app = express();
const http = createServer(app);
const io = createSocket(http);


createRoutes(app, io);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4444;

http.listen(PORT, function () {
  console.log(`Server: http://localhost:${PORT}`);
});
