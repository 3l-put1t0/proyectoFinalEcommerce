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

    deleteId = async (req, res) => {
        const { uid } = req.params;
        try { 
            const result = await userServices.deleteId(uid);
            res.status(201).send({ status: 'success', message: `Se elimino el usuario con ID ${uid}`, payload: result });
        } catch (er) { 
            res.status(404).send({ status: 'error', message: `No se pudo elimiar al usuario con ID: ${uid}` });
        }
    }
}