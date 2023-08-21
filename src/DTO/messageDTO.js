export class MessageDTO{
    constructor(obj){
        this.user = obj.user.toUpperCase(),
        this.message = obj.message
    }
}