import mongoose from "mongoose";

import config from "../config/config.js";
import { logger } from "./logger.js";

const URL_MONGO = config.URL_MONGO;

export function connection() {
    try{
        mongoose.connect(URL_MONGO);
        logger.info('CONEXIÓN EXITOSA A DB');
    }catch(er){
        logger.error('FALLO LA CONEXIÓN', er);
    }
}