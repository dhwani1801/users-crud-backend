import { UserData } from "../interfaces/user";
import user from "../models/user";

const registerUser = async (userData: UserData) => {
  const result = new user(userData);
  return await result.save();
};

const getUsers = async () => {
  const result = await user.find();
  if (result.length === 0) {
    throw new Error("No users found");
  }
  return result;
};

const updateUser = async (id: string, userData: UserData) => {
  const existingUser = await user.findById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  const result = await user.findByIdAndUpdate(id, userData, { new: true });
  return result;
};

const deleteUser = async (id: string) => {
  const existingUser = await user.findById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  const result = await user.findByIdAndDelete(id);
  return result;
};

export const userService = {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
};
