import { UserDAO } from "../DAO/mongo/manager/user.manager.js";
import { UserDTO } from "../DTO/userDTO.js";

const userDAO = new UserDAO();

export class UserServices{
    constructor(){}

    async getAll(){
        return await userDAO.getAll();
    }

    async getId(id){
        return await userDAO.getId(id);
    }

    async getUserEmail(email){
        return await userDAO.getUserEmail(email);
    }

    async update(id, obj){
        const userDTO = new UserDTO(obj);
        return userDAO.update(id, userDTO);
    }

    async create(obj){
        const userDTO = new UserDTO(obj);
        return userDAO.create(userDTO);
    }

    async deleteId(id){
        return userDAO.deleteId(id);
    }
}