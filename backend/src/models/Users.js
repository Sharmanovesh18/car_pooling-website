import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
  },
    phone: {
    type: String,
    required: true,
    },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("UsersData", userSchema);

export default Users;
