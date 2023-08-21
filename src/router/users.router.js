import { Router } from "express";

import { UserController } from "../controller/users.controller.js";

const router = Router();
const userController = new UserController();

router.route('/')
    .get(userController.getAll);
router.route('/:uid')
    .delete(userController.deleteId);
    // .post();

export default router;