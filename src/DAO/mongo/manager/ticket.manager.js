import ticketModel from "../models/ticket.model.js";

import { logger } from "../../../utility/logger.js";

export class TicketDAO {
    constructor() {

    }

    async getAll() {
        try {
            return await ticketModel.find().lean();
        } catch (er) {
            logger.warning('No se pudo acceder a todos los tickets: ', er);
        }
    }

    async getId(id) {
        try {
            return await ticketModel.findById(id).lean();
        } catch (er) {
            logger.warning(`No se pudo acceder al ticket con id: ${id}`, er);
        }
    }

    async create(obj) {
        try {
            return await ticketModel.create(obj);
        } catch (er) {
            logger.warning(`No se creo el ticket`, er);
        }
    }

    async update(id, obj) {
        try { 
            return await ticketModel.findByIdAndUpdate({ _id: id }, { $set: obj });
        } catch (er) { 
            logger.warning(`No se actualizó el ticket`, er);
        }
    }

    async delete(id){
        try { 
            return await ticketModel.findByIdAndDelete({ _id: id });
        } catch (er) { 
            logger.warning(`No se eliminó el ticket`, er);
        }
    }
}