import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors"
import authentication from "./routers/authentication.js";
import session from "express-session";
import passport from "passport";

const app = express()

app.use(session({
   secret:process.env.SESSION_SECRET,
   resave:false,
   saveUninitialized:false,
   cookie: { secure: true }
}))

app.use(express.json())
app.use(cors({
   origin:'*'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', authentication)

const httpServer = createServer(app)
const io = new Server(httpServer, {
   cors:{
      origin:'*'
   }
})

io.on('connection',(socket) => {
   socket.on('message', (data) => {
      io.sockets.emit('message_get', {message:data, id: socket.id})
   })
   socket.on('disconnect', () => {
      console.log('user disconnected');
   });
})

httpServer.listen(process.env.MY_APP_HOST, () => {
   console.log(process.env.MY_APP_HOST)
})
