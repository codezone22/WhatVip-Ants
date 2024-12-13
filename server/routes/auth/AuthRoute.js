const express = require('express');
const authController = require('../../controller/authController/authController');
const verify = require('../../middlewares/auth/verify');

const authRoutes = express.Router();

// Đăng nhập qua Google
authRoutes.post('/google/callback', authController.loginWithGoogle);

// Đăng ký tài khoản mới
authRoutes.post('/register', authController.registerUser);

// Đăng nhập tài khoản
authRoutes.post('/login', authController.loginUser);

// Đăng xuất tài khoản
authRoutes.post('/logout', verify.verifyToken, authController.logoutUser);

// Yêu cầu refresh token
authRoutes.post('/refresh', authController.requestRefreshToken);

// Quên mật khẩu
authRoutes.post('/forgot-password', authController.forgotPassword);

// Đặt lại mật khẩu


module.exports = authRoutes;