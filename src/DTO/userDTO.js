export class UserDTO{
    constructor(obj){
        this.firstName = obj.firstName.toUpperCase();
        obj.lastName == undefined ? this.lastName = obj.lastName : this.lastName = obj.lastName.toUpperCase();
        this.email = obj.email;
        this.password = obj.password;
        this.role = obj.role;
        obj.age == undefined ? this.age = obj.age : this.age = Number(obj.age);        
    }
}