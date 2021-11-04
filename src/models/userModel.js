const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

userSchema.methods.verifyPassword = function (psw) {
    return bcrypt.compare(psw, this.password)
};

userSchema.methods.encryptPassword = async (psw) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(psw, salt);
};
module.exports = model("user", userSchema);