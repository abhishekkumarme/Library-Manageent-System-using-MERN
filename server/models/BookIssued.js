const {model, Schema} = require('mongoose');
const Book = require('./Book');

const BookIssuedSchema = new Schema({
    bookIsbn:{
        type: String,
        required: true, 
        ref: 'Book',
    },
    issuedTo: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    issuedBy: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    status:{
        type: String,
        enum: ['ISSUED', 'RETURNED'],
        default: 'ISSUED',
    }
},{timestamps: true});

BookIssuedSchema.pre('save', async function(next) {
    const bookIssued = this;
    let value =0;
    if(bookIssued.isNew) {
        value = 1;
    } else {
       if(bookIssued.modifiedPaths().includes('status')) {
        if(bookIssued.status === 'RETURNED') {
                 value = -1;
    }else{
        value = 1;
    }
}
    }
if(value){
    await Book.updateOne(
        {isbn: bookIssued.bookIsbn},
        {$inc: {issuedQuantity: value}}
    );
}
});

const BookIssued = model('BookIssued', BookIssuedSchema);
 module.exports = BookIssued;
        