import mongoose from "mongoose";

const nameCollection = "tickets";

const nameSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true
    },
    purchase_dataTime: {
        type: Date,
        require: true
    },
    amount: {
        type: Number,
        require: true
    }, 
    purcharse: {
        type: String,
        require: true
    }

});

const ticketModel = mongoose.model(nameCollection, nameSchema);

export default ticketModel;