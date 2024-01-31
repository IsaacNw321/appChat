import { Message } from "../models/Message.js";

export const getMessages =  async (req, res) =>{
  try {
    const messages = await Message.findAll()
    res.json(messages)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getMessage =   async (req, res) =>{
  try {
    const {id} = req.params;
    const message = await Message.findOne({
      where : {
        id
      }
    })
    res.json(message)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const createMessage =  async (req, res) =>{
  try {
    const {content, UserId} = req.body
    const newMessage = await Message.create({
      content,
      UserId
    })
    res.json(newMessage)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const updateMessage =  async (req, res) =>{
  try {
    const {id} = req.params
    const message = await Message.findByPk(id)
    message.set(req.body)
    await message.save();
    return res.json(message)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const deleteMessage =   async (req, res) =>{
  const {id} = req.params
  try {
    const message = await Message.destroy({
    where : {
      id
    }
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
