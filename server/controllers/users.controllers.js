import { Message } from "../models/Message.js";
import { User } from "../models/Users.js";

export const getUsers  = async (req, res) => {
  try{
    const Users = await User.findAll()
    res.json(Users)
  } catch (error){
    return res.status(500).json({message: error.message})
  }
  
}

export const getUser = async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findOne({
      where:{
        id
      }
    })
    if (!user) return res.status(404).json({message: "User does not exist"})
    res.json(user)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const createUser  = async (req, res) => {
  try{
  const {firstName , lastName} = req.body
  const newUser = await User.create({
    firstName,
    lastName
  })
  res.json(newUser)
  } catch(error){
    return res.status(500).json({message: error.message})
  } 
}

export const updateUser = async (req,res) =>{
  try{
  const {id} = req.params;
  const {firstName, lastName} = req.body
  const user = await User.findByPk(id)
  user.firstName = firstName
  user.lastName = lastName
  await user.save()
  res.json(user);
  } catch (error){
    return res.status(500).json({message: error.message})
  }
}

export const deleteUser = async (req, res) =>{
  const {id} = req.params
  try {
    await User.destroy({
    where : {
      id,
    }
    })
  res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getUserMessages = async (req, res) =>{
  const {id} = req.params
  try {
    const messages = await Message.findAll({
      where :{ UserId : id },
    });
    return res.json(messages)
  } catch (error) {
    return res.status(500).json({message: error.message})
  } 
}