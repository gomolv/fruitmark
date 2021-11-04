const { Schema, model } = require('mongoose');

const logSchema = new Schema({
    catalog_id: {
        type: Schema.Types.ObjectId,
        ref: 'catalog', required: true
    },
    from_id: {
        type: Schema.Types.ObjectId,
        ref: 'store', required: false
    },
    inStockFrom: {
        type: Number,
        required: true
    },
    to_id: {
        type: Schema.Types.ObjectId,
        ref: 'store', required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    inStockTo: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = model("log", logSchema);