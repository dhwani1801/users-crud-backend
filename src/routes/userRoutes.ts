import express from "express";
import upload from "../middleware/upload";
import { userController } from "../controllers/userController";

const router = express.Router();

router.post("/", upload.single("profilePicture"), userController.registerUser);
router.get("/list", userController.getUsers);
router.put("/:id", upload.single("profilePicture"), userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
