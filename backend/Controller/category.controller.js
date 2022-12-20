const category = require("../Models/category");

module.exports.getAllCategories= async (req, res) => {
    try {
        let categories = await category.find();
        return res.status(200).json({
            success: true,
            categories
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

module.exports.createCategory = async (req, res) => {
    try {
	console.log(req.body.nomCat)
        let newCategory = new category({
            nomCat: req.body.nomCat,
        });
        let savedCategory = await newCategory.save();
        return res.status(200).json({
            success: true,
            category: savedCategory
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports.editCategory = async (req, res) => {
    try {
        let { categoryId } = req.params;
        let { nomCat } = req.body;
        let updatedCategory = await category.findByIdAndUpdate(categoryId, {
            $set: {
                nomCat: nomCat
            }
        },
            {
                new: true
            });
        return res.status(200).json({
            success: true,
            category: updatedCategory
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports.deleteCategory = async (req, res) => {
    try {
        let { categoryId } = req.params;
        await category.findByIdAndDelete(categoryId);
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
module.exports.showCategory = async (req, res) => {
    try {
        let { categoryId } = req.params;
        let categorydetail = await category.findById(categoryId);
        return res.status(200).json({
            success: true,
            category: categorydetail
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}






