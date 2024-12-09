const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    orderItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    star: {
        type: Number,
        require: [true, 'Star of review is required.']
    },
    
    content: {
        type: String,
        require: [true, 'Content review is required.']
    },
    reviewDate: {
        type: Date,
        require: [true, 'Date of review is required.']
    },
    imagesRv: {
        type: [String]
    },
    isResponsed:{
        type: Boolean,
        default:false
    },
    response: {
        type: {
            content: String, 
            date: Date,
            imagesRsp: [String]
        }
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;