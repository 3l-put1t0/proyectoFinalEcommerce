import { Router } from "express";

import { UserController } from "../controller/users.controller.js";

const router = Router();
const userController = new UserController();

router.route('/')
    .get(userController.getAll);
router.route('/:uid')
    .get(userController.getId)
    .delete(userController.deleteId)
    .put(userController.update);
    // .post();

export default router;