import mongoose, {Schema} from "mongoose";
import { IUser } from '../interfaces/users/user.interface'

const UserSchema: Schema<IUser>  = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

export default User;
