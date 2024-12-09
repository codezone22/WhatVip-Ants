const express = require('express');
const { 
    
} = require('../../controller/authController/authController');
const authController = require('../../controller/authController/authController');
const verify = require('../../middlewares/auth/verify');

const authRoutes = express.Router();

authRoutes.post('/google/callback', authController.loginWithGoogle);
authRoutes.post('/register', authController.registerUser);
authRoutes.post('/login', authController.loginUser);
authRoutes.post('/logout', verify.verifyToken, authController.logoutUser);
authRoutes.post('/refresh', authController.requestRefreshToken);


module.exports = authRoutes;