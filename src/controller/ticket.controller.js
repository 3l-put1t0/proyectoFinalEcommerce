import { TicketService } from "../services/ticket.service.js";

const ticketService = new TicketService();

export class TicketController {
    constructor() { }

    getTickets = async (req, res) => {
        try {
            const result = await ticketService.getAll();
            res.status(201).send({ status: 'success', message: 'Se obtienen todos los tickets', payload: result });
        } catch (er) {
            res.status(404).send({ status: 'error', message: 'No se obtienen todos los tickets' });
        }
    }

    getTicket = async (req, res) => {
        try {
            const { tid } = req.params;
            const result = await ticketService.getId(tid);
            res.status(201).send({ status: 'success', message: 'Se obtiene el ticket', payload: result });
        } catch (er) {
            res.status(404).send({ status: 'error', message: 'No se obtiene el ticket' });
        }
    }

    createTicket = async (req, res) => {
        try {
            const { code, purchase_dataTime, amount, purcharse } = req.body;
            if (!code || !purchase_dataTime || !amount || !purcharse) return res.status(401).send({ status: 'error', message: 'Faltan valores' });
            const ticket = { code, purchase_dataTime, amount, purcharse };
            const result = await ticketService.create(ticket);
            res.status(201).send({ status: 'success', message: 'Se crea ticket', payload: result });
        } catch (er) {
            res.status(404).send({ status: 'error', message: 'No se creo ticket' });
        }
    }

    updateTicket = async (req, res) => {
        try {
            const { tid } = req.params;
            const { code, purchase_dataTime, amount, purcharse } = req.body;
            if (!code || !purchase_dataTime || !amount || !purcharse) return res.status(401).send({ status: 'error', message: 'Faltan valores' });
            const ticket = { code, purchase_dataTime, amount, purcharse };
            const result = await ticketService.update(tid, ticket);
            res.status(201).send({ status: 'success', message: 'Se actualiza ticket', payload: result });

        } catch (er) {
            res.status(404).send({ status: 'error', message: 'No se actualizó ticket' });
        }
    }

    deleteTicket = async (req, res) => {
        try {
            const { tid } = req.params;
            const result = await ticketService.delete(tid);
            res.status(201).send({ status: 'success', message: 'Se elimina ticket', payload: result });
        } catch (er) {
            res.status(404).send({ status: 'error', message: 'No se eliminó ticket' });
        }

    }
}