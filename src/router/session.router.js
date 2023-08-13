import { Router } from "express";
import { SessionController } from "../controller/session.controller.js";

const router = Router();
const sessionController = new SessionController();

router.post('/register', sessionController.register);
router.post('/login', sessionController.login);
router.post('/logout', sessionController.logout);

export default router;          