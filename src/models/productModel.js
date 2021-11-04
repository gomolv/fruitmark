const { Schema, model } = require('mongoose');

const productSchema = new Schema({

        catalog_id: {
                type: Schema.Types.ObjectId,
                ref: 'catalog', required: true
        },
        store_id: {
                type: Schema.Types.ObjectId,
                ref: 'store', required: true
        },
        inStock: {
                type: Number,
                required: true,
                default: 0
        },
        price: {
                type: Number,
                required: true
        },
        created_at: {
                type: Date,
                default: new Date()
        }
});

module.exports = model("product", productSchema);