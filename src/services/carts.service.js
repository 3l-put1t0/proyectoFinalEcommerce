import { CartsDAO } from "../DAO/mongo/manager/carts.manager.js";

const cartsDAO = new CartsDAO();

export class CartsService{
    constructor(){}

    async getAll(){
        return await cartsDAO.getAll();
    }

    async getId(id){
        return await cartsDAO.getId(id);
    }

    async create(obj){
        return await cartsDAO.create(obj);
    }

    async update(id, obj){
        return await cartsDAO.update(id, obj);
    }

    async delete(id){
        return await cartsDAO.delete(id);
    }
}