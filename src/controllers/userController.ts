import { Request, Response } from "express";
import { sendResponse } from "../utils/responseHandler";
import { userService } from "../services/userService";
import { isValidEmail } from "../utils/validation";

/**
 * User Registration 
 * @param req 
 * @param res 
 */
const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email ,userName, contactInfo} = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json(sendResponse(null, "Invalid email format", 400));
    }

    const profilePicture = req.file ? req.file.path : undefined;
    const newUser = await userService.registerUser({
      name,
      email,
      profilePicture,
      userName,
      contactInfo
    });
    res
      .status(201)
      .json(sendResponse(newUser, "User created successfully", 201));
  } catch (error: any) {
    res.status(500).json(sendResponse(null, error.message, 500));
  }
};

/**
 * User Listing
 * @param _req 
 * @param res 
 */
const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res
      .status(200)
      .json(sendResponse(users, "Users fetched successfully", 200));
  } catch (error: any) {
    if (error.message === "No users found") {
      res.status(404).json(sendResponse(null, error.message, 404));
    } else {
      res.status(500).json(sendResponse(null, error.message, 500));
    }
  }
};

/**
 * Edit User
 * @param req 
 * @param res 
 */
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email ,userName, contactInfo } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json(sendResponse(null, "Invalid email format", 400));
    }
    
    const profilePicture = req.file ? req.file.path : undefined;
    const updatedUser = await userService.updateUser(id, {
      name,
      email,
      profilePicture,
      userName,
      contactInfo
    });
    res
      .status(200)
      .json(sendResponse(updatedUser, "User updated successfully", 200));
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json(sendResponse(null, error.message, 404));
    } else {
      res.status(500).json(sendResponse(null, error.message, 500));
    }
  }
};


/**
 * Delete User
 * @param req 
 * @param res 
 */
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json(sendResponse(null, "User deleted successfully", 200));
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json(sendResponse(null, error.message, 404));
    } else {
      res.status(500).json(sendResponse(null, error.message, 500));
    }
  }
};

export const userController = {
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
};
