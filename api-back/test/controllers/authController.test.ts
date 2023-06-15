import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";
import {
  AuthResponse,
  AuthUserInterface,
} from "../interfaces/auth/auth.interface";
import { login } from "./authController";

const sinon = require("sinon");

// Mock de datos
const testData = {
  email: "test@gmail.com",
  password: "testpassword",
  userId: "6148087bbb724755fb539030",
  secret: config.JWT_SECRET_KEY,
  emailInvalid: "test2@gmail.com",
  passwordInvalid: "testpassword2",
};

// Mock del objeto Response
const responseMock = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("authController test", () => {
  afterEach(() => sinon.restore());

  test("should log in successfully", async () => {
    const requestMock = {
      body: { email: testData.email, password: testData.password },
    } as Request;
    const userLogged: AuthUserInterface = {
      _id: testData.userId,
      name: "user",
      email: testData.email,
      password: testData.password
    };

    // Espía el llamado a la función de clase User.findOne y retorna el usuario creado en el mock
    const findOneSpy = sinon.stub(User, "findOne").resolves(userLogged);
    const compareSpy = sinon.stub(bcrypt, "compare").resolves(true);

    // Valor esperado del token
    const expectedToken = jwt.sign(
      { userId: testData.userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      testData.secret
    );

    // Espía el llamado a la función de la librería jwt y retorna el token generado en el mock
    const signSpy = sinon.stub(jwt, "sign").returns(expectedToken);

    const res = responseMock();
    const result = await login(requestMock, res);

    expect(result.message).toBe("Logged");
    expect(result.token).toBe(expectedToken);
    expect(result.user).toEqual(userLogged);

    expect(findOneSpy.calledOnceWith({ email: testData.email })).toBeTruthy();
    expect(compareSpy.calledOnce).toBeTruthy();
    expect(signSpy.calledOnce).toBeTruthy();

    findOneSpy.restore();
    compareSpy.restore();
    signSpy.restore();
  });

  test("should return error message if email is invalid", async () => {
    const requestMock = {
      body: { email: testData.emailInvalid, password: testData.password },
    } as Request;
    const res = responseMock();

    const findOneSpy = sinon.stub(User, "findOne").resolves(null);
    await login(requestMock, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Correo electronico invalido" });
    expect(findOneSpy.calledOnceWith({ email: testData.emailInvalid })).toBeTruthy();

    findOneSpy.restore();
  });

  test("should return error message if password is incorrect", async () => {
    const requestMock = {
      body: { email: testData.email, password: testData.passwordInvalid },
    } as Request;
    const userLogged: AuthUserInterface = {
      _id: testData.userId,
      name: "user",
      email: testData.email,
      password: testData.password
    };

    const findOneSpy = sinon.stub(User, "findOne").resolves(userLogged);
    const compareSpy = sinon.stub(bcrypt, "compare").resolves(false);
    const res = responseMock();

    await login(requestMock, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Contraseña incorrecta" });
    expect(compareSpy.calledOnce).toBeTruthy();

    findOneSpy.restore();
    compareSpy.restore();
  });
});