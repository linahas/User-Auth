const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        
        nomCat: {
            type: String,
            required: true,
            max: 30,
        },
        

    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);