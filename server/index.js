import express from 'express';
import logger from 'morgan';
import  {Server} from 'socket.io';
import { createServer } from 'node:http';

const Port =  3000;

const app = express();
const server = createServer(app);
const io = new Server(server);
io.on('connection', ()=> {
  console.log('a user has conected');
})
app.use(logger('dev'));

app.get('/', (req, res)=> {
  res.sendFile(process.cwd() + '/client/index.html');
})

server.listen(Port, () => {
  console.log(`Server is runing on port ${Port}`)
});