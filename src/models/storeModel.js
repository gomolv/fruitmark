const { Schema, model } = require('mongoose');

const storeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        cp: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = model("store", storeSchema);