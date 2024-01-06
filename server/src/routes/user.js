import express from "express";
import verifyToken from "../middleware/verifyToken";
import * as userController from "../controllers/user";

const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);
router.put("/", userController.UpdateUser);

export default router;
