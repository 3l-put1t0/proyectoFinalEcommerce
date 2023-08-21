import { CartsService } from "../services/carts.service.js";

const cartsService = new CartsService();

export class CartsController {
    constructor() { }

    getCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const result = await cartsService.getId(cid);
            res.status(201).send({status: 'success', message: `Se encontró el carrito con el ID: ${cid}`});
        } catch (er) {
            res.status(404).send({status: 'error', message: `No se pudo encontrar el carrito con el ID: ${cid}`});
        }
    }

    createCart = async (req, res) => {
        const { product, quantity } = req.body;
        const products = { product, quantity };
        try{
            const obj = await cartsService.create({});
            const id = String(obj._id);
            obj.products.push(products);
            const response = await cartsService.update(id, obj);
            res.status(201).send({status: 'success', payload: response});
        }catch(er){
            res.status(404).send({status: 'error', message: `No se creo el carrito: ${er.message}`});
        }
    }

    updateCart = async (req, res) => {
        const { cid } = req.params;
        const products = req.body;
        try {
            const result = await cartsService.getId(cid);
            result.products = products;
            const response = await cartsService.update(cid, result);
            res.status(201).send({status: 'success', payload: response});
        }catch(er){
            res.status(404).send({status: 'error', message: `No se actualizo el producto de carrito: ${er.message}`});
        }
    }

    deleteProduct = async (req, res) => {
        const { cid, pid } = req.params;
        try{
            const result = await cartsService.getId(cid);
            const position = result.products.findIndex(e => e.product == pid);
            const obj = result.products[position]
            if (obj.quantity > 0) {
                obj.quantity = obj.quantity - 1;
                result.products.splice(position, 1, obj);
            }
            if (obj.quantity == 0) {
                result.products.splice(position, 1);
            }
            const response = await cartsService.update(cid, result);
            res.status(201).send({status: 'success', payload: response});

        }catch(er){
            res.status(404).send({status: 'error', message: `No se eliminio producto de carrito`});
        }
    }

    updateCartProduct = async (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        try{            
            const result = await cartsService.getId(cid);
            const position = result.products.findIndex(e => e.product == pid);
            if (position == -1) return res.status(501).json({status: 'error', message: 'no existe id del producto seleccionado'});
            const obj = result.products[position];
            obj.quantity = quantity;
            const response = await cartsService.update(cid, result);
            res.status(201).send({status: 'success', message: response});
        }catch(er){
            console.log('ERROR updateCartProduct: ',er.message);
            res.status(404).send({status: 'error', message: 'no se actualizo producto de carrito'});
        }
    }


}