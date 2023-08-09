import express from 'express';
import { createUser, loginUser, deleteUser } from '../Controllers/usersControllers';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.delete('/delete/:id', deleteUser)

export default router;