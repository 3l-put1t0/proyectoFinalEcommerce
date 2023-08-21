import { MessageService } from "../services/message.service.js";

const messageService = new MessageService();

export class MessageController{
    constructor(){}

    getAll = async () => {
        return await messageService.getAll();
    }

    async create (obj){
        return await messageService.create(obj);
    }

    deleteAll = async () => {
        return await messageService.deleteAll();
    }
}