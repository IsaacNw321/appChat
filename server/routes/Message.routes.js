import { Router } from "express";
import { createMessage, deleteMessage, getMessage, getMessages, updateMessage } from "../controllers/message.controllers.js";
const router = Router();

router.get('/messages', getMessages)
router.get('/messages/:id', getMessage)
router.post('/messages', createMessage)
router.put('/messages/:id', updateMessage)
router.delete('/messages/:id', deleteMessage)


export default router;