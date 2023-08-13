import mongoose from "mongoose";

const nameCollection = "carts";

const nameSchema = new mongoose.Schema({
    products:
    {
        type: 
        [
            {
                product:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                }
            }
        ]
    }
});

nameSchema.pre('findOne', function () {
    this.populate('products.product');
})

export const cartsModel = mongoose.model(nameCollection, nameSchema);