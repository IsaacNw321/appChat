import express from 'express';
import logger from 'morgan';
import  {Server} from 'socket.io';
import { createServer } from 'node:http';

const Port =  process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery : {}
});
io.on('connection', (socket)=> {
  console.log('a user has conected');
 
  socket.on('chat message', (msg)=>{
    io.emit('chat message', msg)
  })
  socket.on('disconnet',() =>{
    console.log('an user has disconnected')
  })
})
app.use(logger('dev'));

app.get('/', (req, res)=> {
  res.sendFile(process.cwd() + '/client/index.html');
})

server.listen(Port, () => {
  console.log(`Server is runing on port ${Port}`)
});