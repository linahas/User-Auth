const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        nomProd: {
            type: String,
            required: true,
            max: 30,
            unique: true,
        },
        quantite: {
            type: Number,
            required: true,
        },
        prix: {
            type: Number,
            required: true,
            
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
        },   
    },
);

module.exports = mongoose.model("Product", productSchema);