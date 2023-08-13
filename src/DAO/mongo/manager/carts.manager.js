import { cartsModel } from "../models/carts.model.js";

import { logger } from "../../../utility/logger.js";

export class CartsDAO{
    constructor() {}
    
    async getAll() {
        try {
            return await cartsModel.find().lean();
        } catch (er) {
            logger.warning('NO SE PUDO OBTENER TODOS LOS CARRITOS: ', er.message);
        }
    }

    async getId(id) {
        try {
            return await cartsModel.findOne({_id: id}).lean();
        } catch (er) {
            logger.warning('NO SE PUDO OBTENER EL CARRITO POR ID: ', er.message);
        }
    }

    async create(obj){
        try {
            return await cartsModel.create({$push: obj});
        } catch (er) {
            logger.warning('NO SE PUDO CREAR CARRITO: ', er.message);
        }
    }

    async update(id, obj){
        try {
            return await cartsModel.findOneAndUpdate({_id: id}, {$set: obj});
        } catch (er) {
            logger.warning('NO SE PUDO ACTUALIZAR CARRITO: ', er.message);
        }
    }

    async delete(id){
        try {
            return await cartsModel.findOneAndDelete({_id: id});
        } catch (er) {
            logger.warning('NO SE PUDO ELIMINAR CARRITO: ', er.message);
        }
    }
}