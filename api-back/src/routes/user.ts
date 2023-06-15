import express from 'express'
import { getUsers, createUser, updateUser, deleteUser, getUserById } from '../controllers/userController';
import {AuthenticateUser} from '../middleware/Authentication'

const Router = express.Router();

Router.get('/', getUsers);
Router.get('/:id', AuthenticateUser, getUserById)
Router.post('/new', AuthenticateUser, createUser);
Router.put('/update/:id', AuthenticateUser, updateUser);
Router.delete('/delete/:id', AuthenticateUser, deleteUser);

export default Router;
