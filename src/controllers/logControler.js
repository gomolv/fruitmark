const logModel = require('../models/logModel');
const logController = {}


catalogController.getLog = async (req, res) => {
    try {
        const log = await logModel.find();
        if (log) {
            return res.status(200).json({
                status: true,
                catalog,
                message: "log find"
            });
        } else {
            return res.status(200).json({
                status: false,
                message: "log empty"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong, please try again-"
        });
    }
}


module.exports = logController;