import userModel from "../models/user.model.js";

import { logger } from "../../../utility/logger.js";

export class UserDAO{
    constructor(){}

    async getAll(){
        try{
            return await userModel.find().lean();
        }catch(er){
            logger.warning('ERROR AL BUSCAR TODOS LOS USUARIOS: ', er.message);
        }    
    }

    async getId(id){
        try{
            return await userModel.findById(id).lean();
        }catch(er){
            logger.warning(`ERROR AL BUSCAR EL USUARIO POR ID: ${id}`, er.message);
        }    
    }

    async getUserEmail(email){
        try{
            return await userModel.findOne({email}).lean();
        }catch(er){
            logger.warning('ERROR AL BUSCAR AL USUARIO POR EMAIL: ', er.message);
        }    
    }

    async update(id, obj){
        try{
            return await userModel.findByIdAndUpdate({_id: id}, {$set: obj});
        }catch(er){
            logger.warning('ERROR AL ACTUALIZAR EL USUARIO: ', er.message);
        }    
    }

    async create(obj){
        try{
            return await userModel.create(obj);
        }catch(er){
            logger.warning('ERROR AL CREAR USUARIO: ', er.message);
        }
    }

    async deleteId(id){
        try{
            return await userModel.deleteOne({_id: id});
        }catch(er){
            logger.warning('ERROR AL ELIMINAR EL USUARIO POR id: ', er.message);
        }
    }

}