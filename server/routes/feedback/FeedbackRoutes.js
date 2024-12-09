const express = require('express');
const verify = require('../../middlewares/auth/verify');
const { 
    getAllFeedbacks, responseFeedback, feedbackOfUser
} = require('../../controller/feedbackController/FeedbackController');

const feedbackRoutes = express.Router();

feedbackRoutes.post('/feedbackOfUser/:id', feedbackOfUser);
feedbackRoutes.get('/all_feedback', getAllFeedbacks);
feedbackRoutes.patch('/responseFeedback/:id', responseFeedback);

module.exports = feedbackRoutes;