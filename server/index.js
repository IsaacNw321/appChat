import express from 'express';
import logger from 'morgan';
import  {Server} from 'socket.io';
import { createServer } from 'node:http';
import { sequelize } from './database/db.js';
import "./models/Message.js";
import "./models/Users.js";
const Port =  process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);

async function connectPostgres(){
  try {
    await sequelize.sync({force : true});
    console.log('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectPostgres();  
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