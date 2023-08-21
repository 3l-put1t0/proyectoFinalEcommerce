import { io } from "../../app.js"
import { logger } from "./logger.js";

export class WebSocket {
    constructor() {
    }

    async getConnection(section, data, funtion, callback) {
        try {
            io.on('connect', socket => {
                logger.info('ESTABLECIO CONEXIÓN CON WEBSOCKET');
                if (funtion === 'emit') {
                    socket.emit(section, data);
                }
                if (funtion === 'on') {
                    socket.on(section, async data => {
                        callback(data);
                    });
                }
            });
        } catch (er) {
            logger.warning('ERROR AL INTERTAR CONECTAR CON WEBSOCKET: ', er.message);
        }
    }

    ioOptions(ioOptions, section, data) {
        try { 
            if (ioOptions === 'emit') {
                io.emit(section, data);
            }
        } catch (er) {
            logger.warning('ERROR AL EMITIR AL WEBSOCKET: ', er);
        }
    }
}