import { ProductService } from "../services/product.service.js";

const productService = new ProductService();

export class ProductController {
    constructor() {

    }

    getProducts = async (req, res) => {
        const { count, asc } = req.body;
        const query = req.query;
        if (count == undefined) count = 10;
        if (asc == undefined) asc = 1;
        try {
            const products = await productService.getAll();
            res.status(200).send({ status: 'success', message: `Se obtuvo todos los productos`, payload: products });
        } catch (er) {
            res.status(404).send({ status: 'error', message: `No se obtuvo todos los productos` });
        }
    }

    createProduct = async (req, res) => {
        try {
            const { title, description, code, price, status, stock, category, thumbnails } = req.body;
            if (!title || !description || !code || !price || !status || !stock || !category)
                return res.status(404).send({ status: 'error', message: `No se ingresaron todos los valores` });
            const product = { title, description, code, price, status, stock, category, thumbnails }
            const result = await productService.create(product);
            return res.status(200).send({ status: 'error', message: `Se creo el producto`, payload: result });
        } catch (er) { 
            return res.status(501).send({ status: 'error', message: `No se creo el producto` });
        }
    }

    updateProduct = async (req, res) => {
        const { pid } = req.params
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        const product = { title, description, code, price, status, stock, category, thumbnails };
        try {
            const result = await productService.update(pid, product)
            res.status(201).send({status: 'success', message: 'se actualizo producto', payload: result})
        }catch(er){
            res.status(501).send({status: 'error', message: 'no se actualizo producto'})
        }
    }

    deleteProduct = async (req, res) => {
        const { pid } = req.params;
        try{
            const result = await productService.delete(pid);
            res.status(201).send({status: 'success', message: 'se elimino producto', payload: result})
        }catch(er){
            res.status(501).send({status: 'error', message: 'no se elimino producto'});
        }
    }
}