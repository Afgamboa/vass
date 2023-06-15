import { Response } from "express";

interface AuthResponse extends Response {
  message?: number;
  token?: string;
  user?: AuthUserInterface;
}

interface AuthUserInterface {
  _id: string,
  name: string;
  email: string;
  password: string;
  age?: number;
  city?: string;
}

export { AuthUserInterface, AuthResponse}
