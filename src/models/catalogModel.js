const { Schema, model } = require('mongoose');

const catalogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false,
        default: 'fruit.png'
    },
    suggestedPrice: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
module.exports = model("catalog", catalogSchema);