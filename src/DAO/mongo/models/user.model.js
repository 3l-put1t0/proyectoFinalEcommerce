import mongoose from "mongoose";

const nameCollection = 'users';

const nameSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    }, 
    lastName:{
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    role:{
        type: String,
        index: true,
        enum: ['USER', 'ADMINISTRATOR', 'PREMIUN', 'DEVELOP'],
        default: 'USER'
    },
    age: Number,
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }
});

nameSchema.pre('findOne', function() {
    this.populate('cart_id');
});


const userModel = mongoose.model(nameCollection, nameSchema);

export default userModel;