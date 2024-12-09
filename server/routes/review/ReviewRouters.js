const express = require('express');

const { 
    getAllReviews, responseReview, getReviewsByProductId, deleteReviewById
} = require('../../controller/reviewController/ReviewController');

const reviewRoutes = express.Router();
reviewRoutes.patch('/responseReview', responseReview);
reviewRoutes.get('/all_review', getAllReviews);
reviewRoutes.get('/getReviewsByProductId/:id', getReviewsByProductId);
reviewRoutes.delete('/delete/:id', deleteReviewById);



module.exports = reviewRoutes;