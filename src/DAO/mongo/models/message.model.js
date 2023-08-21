import mongoose from "mongoose";

const collectionName = "message";

const schemaName = new mongoose.Schema({
    user: {type: String, require: true},
    message: String
});

export const messageModel = mongoose.model(collectionName, schemaName);