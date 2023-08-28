import { Router } from "express";

import { TicketController } from "../controller/ticket.controller.js";

const router = Router();
const ticketController = new TicketController();

router.route('/')
    .get(ticketController.getTickets)
    .post(ticketController.createTicket);

router.route('/:tid')
    .get(ticketController.getTicket)
    .put(ticketController.updateTicket)
    .delete(ticketController.deleteTicket);

export default router;