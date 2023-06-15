import express from 'express';
import { Server } from "socket.io";
import { connectedToMongo } from "./connetion";
import userRoutes from './routes/user'
import authRoutes from './routes/auth'

import cors from "cors";

const port = process.env.PORT || 3002;

//start server

const app = express();
app.use(express.json());
app.use(cors());

connectedToMongo(); // connect to MongoDB

const server = app.listen(port, async () => {
    console.log("vass api running on port", port);
});


app.use('/users', userRoutes)
app.use('/auth', authRoutes)

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, '../public')));

// // web sockets
// const io = new Server(server)


// io.on('connection', (socket) => {

//     socket.on('chat:message', (data) => {
//         io.sockets.emit('chat:message:serve', data)
//     })

//     socket.on('chat:typing', (data) => {
//         // si queremos emitir un evento desde el servidor que lo vean todos menos el cliente que lo envia se usa el metodo broadcast
//         socket.broadcast.emit('chat:typing:serve', data)
//     })
// })



