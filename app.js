import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import config from "./src/config/config.js";
import { connection } from "./src/utility/connection.mongo.js";
import __dirname from './src/util.js';
import { addLogger } from "./src/utility/logger.js";

import viewRouter from './src/router/view.router.js';
import sessionRouter from './src/router/session.router.js';
import cartsRouter from './src/router/carts.router.js';
import productsRouter from './src/router/products.router.js';
import userRouter from './src/router/users.router.js';

const PORT = config.PORT || 8081;

const app = express();
connection();

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
/********************************************************
***********************MIDDLEWAREs***********************
*********************************************************/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(addLogger);
/********************************************************
*************************ROUTERs*************************
*********************************************************/
app.use('/', viewRouter);
app.use('/api', sessionRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', userRouter);

const server = app.listen(PORT, console.log(`ESCUCHANDO PUERTO: ${PORT}`));

export const io = new Server(server);
