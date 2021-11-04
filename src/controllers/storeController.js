const storeModel = require('../models/storeModel');
const storeController = {}

async function getStore(param) {
    try {
        return storeModel.findOne(param);
    } catch (err) {
        return false;
    }
}

storeController.register = async (req, res) => {
    try {

        const { code, city } = req.body;
        if (code && city.name && city.cp) {
            const verifyStore = await getStore({ code });
            if (verifyStore) {
                return res.status(400).json({
                    status: false,
                    message: "Store with code: " + code + " is already taken"
                });
            }

            const store = new storeModel({
                code, city
            });

            if (await store.save()) {
                return res.status(200).json({
                    status: true,
                    message: "Store created successful."
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
            message: "Something is wrong, please try again." + error
        });
    }
}

storeController.list = async (req, res) => {
    try {
        const stores = await storeModel.find();
        if (stores) {
            return res.status(200).json({
                status: true,
                stores,
                message: "Stores find"
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Stores not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Stores not found"
        });
    }
}

storeController.getStore = async (req, res) => {

    const { query } = req;
    try {
        const stores = await storeModel.find({ code: query.code });
        if (stores) {
            return res.status(200).json({
                status: true,
                stores,
                message: "Stores find"
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Stores not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Stores not found"
        });
    }
}

module.exports = storeController;