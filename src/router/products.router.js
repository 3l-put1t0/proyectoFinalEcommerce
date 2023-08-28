import { Router } from "express";

import { ProductController } from "../controller/products.controller.js";
import policies from "../utility/auth.middleware.js";


const router = Router();
const productController = new ProductController();

router.route('/')
    .get(productController.getProducts)
    .post(policies.policySuper(), productController.createProduct);
router.get('/:pid', productController.getProduct)
router.get('/query', productController.getProducts);
router.get('/:count/:asc/query', productController.getProducts);
router.put('/:pid', productController.updateProduct);
router.delete('/:pid', policies.policySuper(), productController.deleteProduct);

export default router;