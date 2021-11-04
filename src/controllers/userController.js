const { response } = require("express");
require('dotenv').config();
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const userController = {}

async function getUser(param) {
    try {
        return userModel.findOne(param);
    } catch (err) {
        return false;
    }
}

userController.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser({ email });
    if (user) {
        const verifyPassword = await user.verifyPassword(password);
        if (!verifyPassword) {
            return res.status(400).json({
                status: false,
                message: "Email o Password incorrect."
            })
        }

        try {
            const token = jwt.sign(user._id.toString(), process.env.PRIVATE_KEY);
            return res.status(200).json({ status: true, token, message: "login successful" });
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "There was a problem, please try again."
            })
        }

    } else {
        return res.status(400).json({
            status: false,
            message: "Email o Password incorrect."
        })
    }
}

userController.auth = async (req, res) => {
    try {
        const token = req.header('auth');
        if (token) {
            const verify = jwt.verify(token, process.env.PRIVATE_KEY)
            if (verify) {
                return res.status(200).json({
                    status: false,
                    message: "Token is valid"
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "token doesn't valid"
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "You must log in to continue."
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "You must log in to continue." + error
        });
    }


}

userController.register = async (req, res) => {
    const { username, email, password, name } = req.body;
    if (username && email && password && name) {
        const verifyUsername = await getUser({ username });
        if (verifyUsername) {
            return res.status(400).json({
                status: false,
                message: "Username: " + username + "is already taken"
            });
        }
        const verifyEmail = await getUser({ email });
        if (verifyEmail) {
            return res.status(400).json({
                status: false,
                message: "Email: " + email + "is already taken"
            });
        }

        const user = new userModel({
            username,
            email,
            password,
            name
        })
        user.password = await user.encryptPassword(user.password);
        if (await user.save()) {
            return res.status(200).json({
                status: true,
                message: "User created successful."
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "There was a problem, please try again."
            })
        }

    } else {
        return res.status(400).json({
            status: false,
            message: "Fill all required fields"
        });
    }
}


module.exports = userController;