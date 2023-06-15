
import  jwt, { JwtPayload }  from 'jsonwebtoken';
import {Request, NextFunction, Response} from 'express';
import {config} from '../config'

export interface IVerifyToken {
  userId?: string;
  exp?: number;
  iat?: number;
}
export async function AuthenticateUser(req: Request, res: Response, next: NextFunction){
  let decodedVerifyToken : IVerifyToken;
  let tokenExp: Date;
  let access_token;
  if (req.headers.authorization) access_token = req.headers.authorization.split(' ')[1];

  if(!access_token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    decodedVerifyToken = await jwt.verify(access_token, config.JWT_SECRET_KEY) as JwtPayload;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Unauthorized' })
  }
  if(decodedVerifyToken.exp) {
    tokenExp = new Date(decodedVerifyToken.exp * 1000)

    if(new Date() > tokenExp)
    return res.status(401).json({ message: 'Token Expired' })
  };
  
  next();
}


