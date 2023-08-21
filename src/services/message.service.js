import { MessageDAO }  from "../DAO/mongo/manager/message.manager.js";
import { MessageDTO } from "../DTO/messageDTO.js";

const messageDAO = new MessageDAO();

export class MessageService{
    constructor(){}

    async getAll(){
        return await messageDAO.getAll();
    }

    async delete(id){
        return await messageDAO.delete(id);
    }

    async deleteAll(){
        return await messageDAO.deleteAll();
    }

    async create(obj){
        const message = new MessageDTO(obj);
        return await messageDAO.create(message);
    }

    async update(id, obj){
        const message = new MessageDTO(obj);
        return await messageDAO.update(id, message);
    }
}