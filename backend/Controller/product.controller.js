const User = require("../Models/user");
const product = require("../Models/product");


module.exports.getAllProducts = async (req, res) => {

    let Products = await product.find();
    return res.status(200).json({
        success: true,
        Products
    })

}

module.exports.createProduct = async (req, res) => {
    try {
        let {
            nomProd,
            quantite,
            prix,
            categorie,
        } = req.body
        let newProduct = new product({
            nomProd: nomProd,
            quantite: quantite,
            prix: prix,
            categorie: categorie
        });
        let savedProduct = await newProduct.save();
        return res.status(200).json({
            success: true,
            product: savedProduct
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports.editProduct = async (req, res) => {
    try {
        let { productId } = req.params;
        let { nom } = req.body;
        let updatedProduct = await Product.findByIdAndUpdate(productId, {
            $set: {
                nom: nom
            }
        },
            {
                new: true
            });
        return res.status(200).json({
            success: true,
            product: updatedProduct
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports.deleteProduct = async (req, res) => {
    try {
        let { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({
            success: true,
            message: "delete successfully."
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports.showProduct = async (req, res) => {
    try {
        let { productId } = req.params;
        let productDetail = await Product.findById(productId);
        return res.status(200).json({
            success: true,
            product: productDetail
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}