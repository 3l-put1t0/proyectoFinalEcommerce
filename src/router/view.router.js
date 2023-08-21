import { Router } from "express";

import { ViewController } from "../controller/view.controller.js";

const router = Router();
const viewController = new ViewController();

router.get('/login', viewController.getLogin);

router.get('/register', viewController.getRegister);

router.get('/products', viewController.getProducts);
// router.get('/products/:count', viewController.getProducts);
// router.get('/products/:count/:asc', viewController.getProducts);
router.get('/carts/:cid', viewController.getCart);

router.get('/chat', viewController.getChat);

router.get('/users', viewController.getUsers);


export default router;