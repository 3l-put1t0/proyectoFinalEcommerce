import { productsModel } from "../models/products.model.js";

import { logger } from "../../../utility/logger.js";

export class ProductsDAO {
    constructor() { }

    async getAll(count, asc, query, pag) {
        try {
            return await productsModel.paginate(
                query,
                {
                    limit: count,
                    page: Number(pag),
                    sort: String(asc),
                    lean: true
                }
            );
        } catch (er) {
            logger.warning('NO SE PUDO OBTENER TODOS LOS PRODUCTOS: ', er);
        }
    }

    async getId(id) {
        try {
            return await productsModel.findById({ _id: id }).lean();
        } catch (er) {
            logger.warning(`NO SE PUDO OBTENER EL PRODUCTO POR id: ${id}`, er);
        }
    }

    async getOwner(owner) {
        try {
            return await productsModel.findOne({ owner }).lean();
        } catch (er) {
            logger.warning(`NO SE PUDO OBTENER EL PRODUCTO POR EL DUEÑO: ${id}`, er);
        }
    }

    async update(id, obj) {
        try {
            return await productsModel.findByIdAndUpdate({ _id: id }, { $set: obj });
        } catch (er) {
            logger.warning('ERROR AL ACTUALIZAR EL PRODUCTO: ', er);
        }
    }

    async create(obj) {
        try {
            return await productsModel.create(obj);
        } catch (er) {
            logger.warning('ERROR AL CREAR PRODUCTO: ', er);
        }
    }

    async deleteId(id) {
        try {
            return await productsModel.deleteOne({ _id: id });
        } catch (er) {
            logger.warning('ERROR AL ELIMINAR EL PRODUCTO POR id: ', er);
        }
    }
}