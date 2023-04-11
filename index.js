import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";

const app = express()
app.use(express.json())
const httpServer = createServer(app)
const io = new Server(httpServer, {
   cors:{
      origin:'*'
   }
})

app.get("/", (req, res) => {
   res.send('dsklfklkdslfk')
})

io.on('connection',(socket) => {
   socket.on('message', (data) => {
      io.sockets.emit('message_get', {message:data, id: socket.id})
      console.log('data ------->', data);
   })
   socket.on('disconnect', () => {
      console.log('user disconnected');
   });
})

httpServer.listen(process.env.MY_APP_HOST, () => {
   console.log(process.env.MY_APP_HOST)
})