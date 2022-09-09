import mongoose from "mongoose";

const storeSchema = new mongoose.Schema (
    {
        id: {type: String},
        slug: {type: String,required: true},
        nome_imagem: {type: String}
    }
);

const stores = mongoose.model('stores',storeSchema);

export default stores;
