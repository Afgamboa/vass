import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validateData } from "../utils/validateData";
import _ from "lodash";
import {
  TCreateUser,
  IGetAllUsers,
  IUpdateDataUser,
  TUpdateUser,
  IDeleteUser,
  IUser,
  TUser,
} from "../interfaces/users/user.interface.js";

export async function getUsers(req: Request, res: Response) {
  const userslist: IGetAllUsers = await User.find().lean();
  if (userslist) return res.status(200).json(userslist);
  else return res.status(500).json("Server error");
}

export async function getUserById(req: Request, res: Response) {
  const userId: string = req.params.id;
  let user: TUser = null
  try {
    user = await User.findById(userId);
    if (user === null) {
      return res.status(400).json({ message: "Invalid id" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid id" });
  }
  return res.status(200).json(user);
}

export async function createUser(req: Request, res: Response) {
  const newUser: TCreateUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    city: req.body.city,
    age: req.body.age,
  }
    ? req.body
    : null;

  const dataValid = await validateData(newUser);

  if (!dataValid.isValid) {
    return res.status(400).json(dataValid.message);
  }
  const userExist: IUser = (await User.findOne({ email: newUser.email }))!;
  if (userExist)
    return res.status(400).json({
      message: "The email entered is already in use",
    });

  const passwordHash = await bcrypt.hash(newUser.password, 10);
  newUser.password = passwordHash;
  const user = new User(newUser);
  const userSave: IUser = await user.save();

  if (userSave)
    return res
      .status(200)
      .json({ message: "User created successfully", userSave });
  else return res.status(500).json("The user could not be created");
}

export async function updateUser(req: Request, res: Response) {
  const userId: string = req.params.id;
  const email: string = req.body.email ? req.body.email : null;
  console.log(typeof(req.body.age))

  let passwordHash;
  let updatedUser: TUpdateUser = {};

  const updateData: IUpdateDataUser = _.pick(req.body, [
    "name",
    "email",
    "password",
    "city",
    "age",
  ]);
  const updateDataJson: IUpdateDataUser = JSON.parse(
    JSON.stringify(updateData)
  );

  const dataValid = await validateData(updateDataJson);
  if (!dataValid.isValid) {
    return res.status(400).json({message: dataValid.message});
  }

  if (updateDataJson.password) {
    passwordHash = await bcrypt.hash(updateDataJson.password, 10);
  }

  if (passwordHash != null) updateDataJson.password = passwordHash;

  if (email) {
    const userExist = await User.findOne({ email: email });
    if (userExist && userExist._id != userId)
      return res.status(400).json({
        message: "The email you are trying to update is already in use",
      });
  }
  try {
    updatedUser = (await User.findByIdAndUpdate(userId, updateDataJson, {
      new: true,
    }))!;
    if (updatedUser === null)
      return res.status(400).json({ message: "Error updating user" });
  } catch (error) {
    return res.status(400).json({ message: "Error updating user" });
  }
  return res
    .status(200)
    .json({ message: "User updated successfully", updatedUser });
}

export async function deleteUser(req: Request, res: Response) {
  const userId: string = req.params.id;

  try {
    const deleteUser: IDeleteUser = (await User.findByIdAndDelete(userId))!;
    if (deleteUser != null) {
      return res
        .status(200)
        .json({ message: "User deleted successfully", deleteUser });
    } else {
      return res.status(400).json({ message: "The user id does not match" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "The user id does not match" });
  }
}
