import { UserServices } from "../services/user.service.js";

const userServices = new UserServices();

export class UserController {
    constructor() { }

    getAll = async (req, res) => {
        try {
            const users = await userServices.getAll();
            for (const i of users) {
                delete i.password;
                delete i.age;
            }
            res.status(201).send({ status: 'success', message: `Se obtuvieron todos los usuarios` });
        } catch (er) {
            res.status(404).send({ status: 'error', message: `No se obtuvieron todos los usuarios` });
        }
    }

    getId = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await userServices.getId(uid);
            delete user.password;
            delete user.age;
            res.status(201).send({ status: 'success', message: `Se obtuvo el usuario`, payload: user });
        } catch (er) {
            res.status(404).send({ status: 'error', message: `No se obtuvo el usuario` });
        }
    }

    deleteId = async (req, res) => {
        const { uid } = req.params;
        try {
            const result = await userServices.deleteId(uid);
            res.status(201).send({ status: 'success', message: `Se elimino el usuario con ID ${uid}`, payload: result });
        } catch (er) {
            res.status(404).send({ status: 'error', message: `No se pudo elimiar al usuario con ID: ${uid}` });
        }
    }

    update = async (req, res) => {
        const { uid } = req.params;
        const { firstName, lastName, email, role } = req.body;
        if (!firstName || !email ) {
            req.logger.info('No se digitó toda la informacion');
            return res.status(400).send({status: 'error', message: 'No se digito toda la información'}) 
        }
        const user = { firstName, lastName, email, role }
        try {
            const result = await userServices.update(uid, user);            
            res.status(201).send({ status: 'success', message: `Se actualizo el usuario con ID ${uid}`, payload: result });
        } catch (er) {
            res.status(404).send({ status: 'error', message: `No se pudo actualizar al usuario con ID: ${uid}` });
        }
    }
}



