const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    tittle: {
        type: String,
        required: true,

    },
    author: {
        type: String,
        required: true,
    },
    totalQuantity: {
        type: Number,
        min: 0,
        default: 1,
    },
    issuedQuantity: {
        type: Number,
        min: 0,
        default: 0,
        validate: {
            validator(value) {
                return this.get('totalQuantity') >= value;
            },
        },
    },
    price: {
        type: Number,
        min: 1,
        required: true,
    }
});

const Book = model('Book', bookSchema);
module.exports = Book;