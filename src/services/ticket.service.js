import { TicketDAO } from "../DAO/mongo/manager/ticket.manager.js";
import { TicketDTO } from "../DTO/ticket.DTO.js";

const ticketDAO = new TicketDAO();

export class TicketService{
    constructor(){}

    async getAll(){
        return await ticketDAO.getAll();
    }

    async getId(id){
        return await ticketDAO.getId(id);
    }

    async create(obj){
        const ticket = new TicketDTO(obj);
        return await ticketDAO.create(ticket);
    }

    async update(id, obj){
        const ticket = new TicketDTO(obj);
        return await ticketDAO.update(id, ticket);
    }

    async delete(id){
        return await ticketDAO.delete(id);
    }

}

