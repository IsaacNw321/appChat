import { Router } from "express";
import { 
  createUser, 
  deleteUser, 
  getUser, 
  getUserMessages, 
  getUsers, 
  updateUser } from "../controllers/users.controllers.js";
const router = Router();

router.get('/Users', getUsers)
router.post('/Users', createUser)
router.put('/Users/:id', updateUser)
router.delete('/Users/:id', deleteUser)
router.get('/Users/:id', getUser)
router.get('/Users/:id/Messages', getUserMessages)

export default router;