import { messageModel } from "../models/message.model.js";

import { logger } from "../../../utility/logger.js";

export class MessageDAO {
    constructor() { }

    async getAll() {
        try {
            return await messageModel.find().lean();
        } catch (er) { 
            logger.warning('No se obtuvo todos los mensajes: ', er.message) 
        }
    }

    async create(obj) {
        try {
            await messageModel.create(obj);
        } catch (er) { 
            logger.warning('No se creo el mensaje: ', er.message) 
        }
    }

    async delete(id) {
        try {
            await messageModel.deleteOne({ _id: id });
        } catch (er) { 
            logger.warning('No se elimino el mensaje: ', er.message) 
        }
    }

    async deleteAll() {
        try {
            await messageModel.deleteMany();
        } catch (er) { 
            logger.warning('No se elimino todos los mensajes: ', er.message) 
        }
    }

    async update(id, obj) {
        try {
            await messageModel.updateOne({ _id: id }, { $set: obj });
        } catch (er) { 
            logger.warning('No se actualizo el mensaje: ', er.message) 
        }
    }
}