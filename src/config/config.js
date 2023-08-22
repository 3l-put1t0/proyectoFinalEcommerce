import dotenv from "dotenv";

const environment = "DEVELOPMENT";

dotenv.config({
    path: environment == "DEVELOPMENT" ? "./.env.development" : "./.env.production"

});

export default{
    PORT: process.env.PORT,
    URL_MONGO: process.env.URL_MONGO,
    KEY_SESSION: process.env.KEY_SESSION,
}