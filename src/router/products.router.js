import { Router } from "express";

import { ProductController } from "../controller/products.controller.js";

const router = Router();
const productController = new ProductController();

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct);
router.get('/query', productController.getProducts);
router.get('/:count/:asc/query', productController.getProducts);
router.put('/:pid', productController.updateProduct);
router.delete('/:pid', productController.deleteProduct);

export default router;