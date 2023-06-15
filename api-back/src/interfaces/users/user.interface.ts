import { Document, ObjectId } from "mongoose";

type IGetAllUsers = IUser[];
type TCreateUser = IUser;
type TUser = IUser | null;
type TUpdateUser = IUpdateDataUser;
type IDeleteUser = IUser;

interface IUser extends Document {
  __v?: number;
  _id?: string | ObjectId;
  email: string;
  name: string;
  password: string;
  city?: string;
  age?: number;
}

interface IUpdateDataUser {
  email?: string;
  name?: string;
  password?: string;
  city?: string;
  age?: number;
}

export {
  TCreateUser,
  IGetAllUsers,
  IUpdateDataUser, 
  TUpdateUser, 
  IDeleteUser,
  IUser,
  TUser,
};

