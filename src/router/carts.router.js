import { Router } from "express";

import { CartsController } from "../controller/carts.controller.js";

const router = Router();
const cartsController = new CartsController();

router.post('/', cartsController.createCart);
router.route('/:cid')
    .get(cartsController.getCart)
    .put(cartsController.updateCart);
router.route('/:cid/products/:pid')
    .delete(cartsController.deleteProduct)
    .put(cartsController.updateCartProduct);
export default router;