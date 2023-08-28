import { UserServices } from "../services/user.service.js";
import { createHash, isValidPassword } from "../utility/bcrypt.js";

const userServices = new UserServices();

export class SessionController{
    constructor(){}

    register = async (req, res) =>{
        const { firstName, lastName, email, password, role, age } = req.body;
        if (!firstName || !email || !password) {
            req.logger.info('No se digitó toda la informacion');
            return res.status(400).send({status: 'error', message: 'No se digito toda la información'}) 
        }
        const user = await userServices.getUserEmail(email);
        if (user) {
            req.logger.info('El usuario ya existe, por favor digite otro email');
            return res.status(401).send({status: 'error', message: 'El usuario ya existe'});
        }
        // NOTA: Falta session o JWT 
        const newUser = {
            firstName, 
            lastName,
            email,
            password: createHash(password),
            role,
            age
        }
        await userServices.create(newUser);
        res.status(200).send({status: 'success', message: 'El usuario se creo'});
        req.logger.info('El usuario se creo con exito');
        // NOTA: Falta eliminar password
    }

    login = async (req, res) => {
        const { email, password } = req.body;

        const user = await userServices.getUserEmail(email);
        if (!user) {
            req.logger.info('El email del usuario no existe');
            return res.status(401).send({status: 'error', message: 'El email del usuario no existe'});
        }
        if (!isValidPassword(user, password)) {
            req.logger.info('El password no coincide');
            return res.status(403).send({status: 'error', message: 'El password del usuario no coincide'});
        }
        delete user.password;
        req.session.user = user;
        res.status(200).send({status: 'success', message: 'El usuario se logueo'});
        req.logger.info('El usuario se logueo con exito');

    }

    logout = (req, res) =>{
        // NOTA: Falta logout
        const { logout } = req.body;
        if (logout) {
            req.session.destroy((err) => {
                if (!err) {
                    res.status(201).send({ status: "success", message: 'logout' });
                } else res.send({ status: "error", message: err })
            });
        };
    }

    getUserSession = (req, res) => {
        res.status(201).send({status: 'success', message: 'usuario perteneciente a la sesión', payload: req.session.user});
    }
}