import { ProductsDAO }  from "../DAO/mongo/manager/products.manager.js";
import { ProductDTO } from "../DTO/productsDTO.js";

const productDAO = new ProductsDAO();

export class ProductService{
    constructor(){}

    async getAll(count, asc, query, pag){
        return await productDAO.getAll(count, asc, query, pag);
    }

    async getId(id){
        return await productDAO.getId(id);
    }

    async getOwner(owner){
        return await productDAO.getOwner(owner);
    }

    async update(id, obj){
        const product = new ProductDTO(obj);
        return await productDAO.update(id, product);
    }

    async create(obj){
        const product = new ProductDTO(obj);
        return await productDAO.create(product);
    }

    async delete(id){
        return await productDAO.deleteId(id);
    }
}