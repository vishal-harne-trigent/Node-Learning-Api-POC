import express from "express";
import authMiddleware from "../../common/middleware/auth.middleware";
import validate from "../../common/middleware/validate.middleware";
import userController from "./user.controller";
import {
    createUserSchema,
    idParamSchema,
    patchUserSchema,
    updateUserSchema,
    updateUserStatusSchema,
} from "./user.schema";

const router = express.Router();

router.use(authMiddleware);

router.get("/", userController.getUsers);
router.get("/:id", validate({ params: idParamSchema }), userController.getUserById);
router.post("/", validate({ body: createUserSchema }), userController.createUser);
router.put(
    "/:id",
    validate({ params: idParamSchema, body: updateUserSchema }),
    userController.updateUser
);
router.patch(
    "/:id/status",
    validate({ params: idParamSchema, body: updateUserStatusSchema }),
    userController.updateUserStatus
);
router.patch(
    "/:id",
    validate({ params: idParamSchema, body: patchUserSchema }),
    userController.patchUser
);
router.delete("/:id", validate({ params: idParamSchema }), userController.deleteUser);

export default router;
