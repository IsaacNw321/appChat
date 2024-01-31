import express from 'express';
import logger from 'morgan';
import  {Server} from 'socket.io';
import { createServer } from 'node:http';
import { sequelize } from './database/db.js';
import "./models/Message.js";
import "./models/Users.js";
import usersRoutes from "../server/routes/Users.routes.js";
import messageRoutes from "../server/routes/Message.routes.js";
import { Message } from './models/Message.js';
import { Router } from 'express';
import { User } from './models/Users.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const Port =  process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);

async function connectPostgres(){
  try {
    await sequelize.sync({force : false});
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
io.on('connection', async (socket)=> {
  console.log('a user has conected');
  let randomNumber = uuidv4()
  User.hasMany(Message,{
    foreignKey: "UserId",
    sourceKey: "id"
  })
  
  Message.belongsTo(User, {
    foreignKey: "UserId",
    targetId: "id"
  })
  let randomUser = await User.create({
    id : randomNumber,
    firstName : 'unkow',
    lastName : 'unkow2'
    })
    await randomUser.save();
    console.log(randomUser)
  socket.on('chat message', async (msg)=>{
    try{
      let savedMessage
      savedMessage = await Message.create({
      content : msg,
      UserId : randomNumber
      })
      await savedMessage.save();
     
      io.emit('chat message', msg, savedMessage.getDataValue())
    }catch(e){
      console.error(e);
    }  
  })
  socket.on('disconnet',() =>{
    console.log('an user has disconnected')
  })
})
app.use(logger('dev'));
app.use(express.json());
app.use(usersRoutes);
app.use(messageRoutes);

app.get('/', (req, res)=> {
  res.sendFile(process.cwd() + '/client/index.html');
})

server.listen(Port, () => {
  console.log(`Server is runing on port ${Port}`)
});