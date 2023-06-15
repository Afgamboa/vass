import express from 'express'
import { login } from '../controllers/authController';

const Router = express.Router();

Router.post('/login', login);


export default Router;
