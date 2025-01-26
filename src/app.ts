// node-practice/src/app.ts

// Express import
import express, {Request, Response} from 'express';
import path from 'path';
// Database import
import sequelize from '../db/sequelize';
// Morgan import
import morgan from 'morgan';
// Socket.io imports
import { Server } from 'socket.io';
import http from 'http';
// Routes & Sockets imports
import chatRoutes from './routes/chatRoutes';
import { chatSocket } from './sockets/chatSocket';


const app = express(); // Express app
const server = http.createServer(app); // HTTP server
const io = new Server(server); // Socket.io server

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// HTTP routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/chat', chatRoutes);
app.get('/api/chat/messages', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io events settings
chatSocket(io);

// Database sync
sequelize.sync()
    .then((): void => console.log('Database synced'))
    .catch((error): void => console.error('Error syncing database:', error));

export { app, server };