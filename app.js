import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import MongoStore from "connect-mongo";

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
const KEY_SESSION = config.KEY_SESSION;
const URL_MONGO = config.URL_MONGO;

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

app.use(session({
    //  Va a generar una colección donde se guarda la sesión respectiva, esto
    // con el fin de sostener la sesión si se llega a caer los servicios 
    store: MongoStore.create({
        mongoUrl: URL_MONGO,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 150
    }),
    secret: KEY_SESSION,  //  Firma para encriptar la sesión
    resave: true,
    saveUninitialized: true    
}));
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
