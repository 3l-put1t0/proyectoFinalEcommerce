export class TicketDTO{
    constructor(obj) {
        this.code = obj.code.toUpperCase();
        this.purchase_dataTime = obj.purchase_dataTime;
        this.amount = obj.amount;
        this.purcharse = obj.purcharse
    }
}