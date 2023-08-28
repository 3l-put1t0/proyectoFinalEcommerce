import { Router } from "express";

import { ViewController } from "../controller/view.controller.js";
import policies from "../utility/auth.middleware.js";

const router = Router();
const viewController = new ViewController();

router.get('/login', viewController.getLogin);

router.get('/register', viewController.getRegister);

router.get('/products', viewController.getProducts);
// router.get('/products/:count', viewController.getProducts);
// router.get('/products/:count/:asc', viewController.getProducts);
router.get('/products/add', policies.policySuper(), viewController.getProductAdd);

router.get('/products/modify', policies.policySuper(), viewController.getProductModify);

router.get('/carts/:cid', viewController.getCart);

router.get('/chat', viewController.getChat);

router.get('/users', policies.policyAd(), viewController.getUsers);

router.get('/users/modify', policies.policyAd(), viewController.getUserModify);

export default router;