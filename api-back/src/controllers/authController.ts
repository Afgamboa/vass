import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { config } from "../config";
import jwt from "jsonwebtoken";
import {
  AuthResponse,
  AuthUserInterface,
} from "../interfaces/auth/auth.interface";

async function login(
  req: Request,
  res: Response
): Promise<AuthResponse> {
  const { email, password } = req.body;
  let match;
  let JwtToken;
  const userLogged: AuthUserInterface = (await User.findOne({
    email: email,
  }))!;
  if (userLogged) {
    match = await bcrypt.compare(password, userLogged.password);
  } else {
    return res.status(401).json({ message: "Correo electronico invalido" });
  }

  if (match) {
     JwtToken = generateJWT(userLogged, config.JWT_SECRET_KEY);
  } else return res.status(401).json({ message: "Contraseña incorrecta" });

  return res
      .status(200)
      .json({ message: "Usuario logueado", token: JwtToken, user: userLogged });
}

const generateJWT = (user: AuthUserInterface, jwt_secret: string) => {
  try {
    const access_token = jwt.sign(
      {
        userId: user._id.toString(),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      jwt_secret
    );

    return access_token;
  } catch (error) {
    return error;
  }
};

export { login }
