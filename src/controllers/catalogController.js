const catalogModel = require('../models/catalogModel');
const catalogController = {}

async function getCatalog(param) {
    try {
        return catalogModel.findOne(param);
    } catch (err) {
        return false;
    }
}

catalogController.register = async (req, res) => {
    try {
        const { name, barcode, image, suggestedPrice } = req.body;
        if (name && barcode && image && suggestedPrice) {
            const verifyCatalog = await getCatalog({ barcode });
            if (verifyCatalog) {
                return res.status(400).json({
                    status: false,
                    message: "Catalog with bar-code " + barcode + " is already taken"
                });
            }

            const catalog = new catalogModel({
                name,
                barcode,
                image,
                suggestedPrice
            });

            if (await catalog.save()) {
                return res.status(200).json({
                    status: true,
                    message: "Catalog created successful."
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Something went wrong, please try again."
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

catalogController.getCatalog = async (req, res) => {
    try {
        const catalog = await catalogModel.find();
        if (catalog) {
            return res.status(200).json({
                status: true,
                catalog,
                message: "Catalog find"
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Catalog not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Catalog not found"
        });
    }
}

catalogController.getItem = async (req, res) => {
    try {
        const { code } = req.query
        const catalog = await catalogModel.find({ code });
        if (catalog) {
            return res.status(200).json({
                status: true,
                catalog,
                message: "Catalog find"
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Catalog not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Catalog not found"
        });
    }
}

module.exports = catalogController;