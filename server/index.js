const express = require('express');

const Port =  3000;

const app = express();

app.get('/', (req, res)=> {
  res.send('<h1>This is the Chat</h1>');
})

app.listen(Port, () => {
  console.log(`Server is runing on port ${Port}`)
});