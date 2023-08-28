import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const nameCollection = "products";

const nameSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: String, require: true },
    price: { type: Number, require: true },
    status: { type: Boolean, require: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true },
    thumbnails: { type: Array },
    owner: {
        type: String,
        index: true,
        // type: mongoose.Schema.Types.String,
        // ref: "users"
    }
});

nameSchema.plugin(mongoosePaginate);

// nameSchema.pre('findOne', function() {
//     this.populate('email');
// });

export const productsModel = mongoose.model(nameCollection, nameSchema);
