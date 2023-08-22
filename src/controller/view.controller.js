import { logger } from "../utility/logger.js"

import { ProductService } from "../services/product.service.js";
import { CartsService } from "../services/carts.service.js";
import { UserServices } from "../services/user.service.js";
import { MessageController } from "../controller/message.controller.js";
import { WebSocket } from "../utility/socket.js";


const productService = new ProductService();
const cartsService = new CartsService();
const messagaController = new MessageController();
const userServices = new UserServices();
const webSocket = new WebSocket();

export class ViewController {

    client = 0;

    constructor() {
    }

    getLogin = (req, res) => {
        res.render('login');
        logger.info('Se carga: login');
    }

    getRegister = (req, res) => {
        res.render('register');
        logger.info('Se carga: register');
    }

    getProducts = async (req, res) => {
        let { count, asc } = req.params;
        const query = req.query;
        if (asc == undefined) asc = 1;
        if (count == undefined) count = 10;
        const webSocket = new WebSocket();
        const section = 'products';
        const products = await productService.getAll(Number(count), Number(asc), query, 1);
        await webSocket.getConnection(section, products, 'emit', null);
        res.status(201).render('products');
        logger.info('Se carga: products');
    }

    getCart = async (req, res) => {
        const { cid } = req.params;
        const result = await cartsService.getId(cid);
        for (const i of result.products) {
            let price = i.product.price;
            let total = Number(price) * Number(i.quantity);
            i.product.total = total
        }
        res.status(201).render('carts', result);
        logger.info('Se carga: carts');
    }

    getChat = async (req, res) => {
        if (this.client == 0) await messagaController.deleteAll();
        this.client = this.client + 1;
        const socket = "message";
        await webSocket.getConnection(socket, null, 'on', this.changeData);
        res.status(201).render('chat');
        logger.info('Se carga: chats');
    }

    changeData = async (obj) => {
        messagaController.create(obj);
        this.findMessages();
    }

    findMessages = async () => {
        const data = await messagaController.getAll();
        // const webSocket = new WebSocket();
        const section = 'messageLogs';
        webSocket.ioOptions('emit', section, data);
    }


    getUsers = async (req, res) => {
        try {
            const users = await userServices.getAll();
            for (const i of users) {
                delete i.password;
                delete i.age;
            }
            const result = { users }
            res.status(201).render('users', result);
        } catch (er) {
            res.status(404).send({ status: 'error', message: `No se obtuvieron todos los usuarios` });
        }
    }

    getUserModify = async (req, res) => {
        try { 
            res.status(201).render('modifyUser', {});
        } catch (er) { 
            res.status(404).send({ status: 'error', message: `No se obtuvo el usuario` });
        }
    }

    getProductModify = async (req, res) => {
        try { 
            res.status(201).render('modifyProduct', {});
        } catch (er) { 
            res.status(404).send({ status: 'error', message: `No se pudo agregar producto` });
        }
    }
}