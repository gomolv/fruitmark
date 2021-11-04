const productModel = require('../models/productModel');
const catalogModel = require('../models/catalogModel');
const logModel = require('../models/logModel');
const productController = {}

async function getProduct(param) {
    try {
        return productModel.findOne(param);
    } catch (err) {
        return false;
    }
}

productController.register = async (req, res) => {
    try {
        const { catalog_id, store_id, inStock, price } = req.body;

        if (catalog_id && store_id && inStock && price) {
            const verifyCatalog = await getProduct({ store_id, catalog_id });
            if (verifyCatalog) {
                return res.status(400).json({
                    status: false,
                    message: "Product is already taken"
                });
            }

            const product = new productModel({
                catalog_id, store_id, inStock, price
            });

            if (await product.save()) {
                return res.status(200).json({
                    status: true,
                    message: "Product created successful."
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "There was a problem, please try again."
                });
            }

        } else {
            return res.status(400).json({
                status: false,
                message: "Fill all required fields"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong, please try again." + error
        });
    }

}


productController.transfer = async (req, res) => {
    try {

        const { catalog_id, from_id, to_id, quantity } = req.body;
        if (catalog_id && from_id && to_id && quantity) {
            var from = await getProduct({ store_id: from_id, catalog_id });
            var to = await getProduct({ store_id: to_id, catalog_id });
            if (from) {
                if (from.inStock > 0) {
                    await productModel.updateOne({ _id: from._id },
                        { $set: { inStock: (from.inStock - quantity) } });
                    if (!to) {
                        const catalog = await catalogModel.findById(catalog_id);
                        const toUpdate = await new productModel({
                            catalog_id,
                            store_id: to_id,
                            inStock: quantity,
                            price: catalog.suggestedPrice
                        })
                        toUpdate.save()
                        var to = await getProduct({ store_id: to_id, catalog_id });
                    } else {
                        await productModel.updateOne({ _id: to._id },
                            { $set: { inStock: (to.inStock + quantity) } });
                    }
                    const log = new logModel({
                        catalog_id,
                        from_id,
                        inStockFrom: from.inStock,
                        to_id,
                        inStockTo: to.inStock,
                        quantity
                    })
                    if (await log.save()) {
                        return res.status(200).json({
                            status: true,
                            message: "successful transfer."
                        });
                    } else {
                        return res.status(500).json({
                            status: false,
                            message: "Something went wrong, please try again." + error
                        });
                    }
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "There are not products in stock."
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Product doesn't exist in the store"
                });
            }


        } else {
            return res.status(400).json({
                status: false,
                message: "Fill all required fields"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong, please try again." + error
        });
    }

}

productController.getProducts = async (req, res) => {
    try {
        const { code } = req.query
        const products = await productModel.aggregate([{
            $lookup: {
                from: 'catalogs',
                localField: 'catalog_id',
                foreignField: '_id',
                as: 'desc'
            }
        }, { $unwind: "$desc" }, {
            $lookup: {
                from: 'stores',
                localField: 'store_id',
                foreignField: '_id',
                as: 'store'
            }
        }, { $unwind: "$store" }, {
            $match: {
                $and: [{ "store.code": code }]
            }
        }]).project({
            _id: 1,
            catalog_id: 1,
            inStock: 1,
            price: 1,
            name: "$desc.name",
            image: "$desc.image",
            barcode: "$desc.barcode"
        }
        );
        if (products) {
            return res.status(200).json({
                status: true,
                products,
                message: "Products find"
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Products not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Products not found" + error
        });
    }
}


module.exports = productController;