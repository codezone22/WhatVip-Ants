const User = require('../../model/user/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

let refreshTokens = [];


const authController = {
    // Đăng nhập qua Google
    loginWithGoogle: async (req, res) => {
        try {
            const { googleToken } = req.body;
    
            // Xác thực token Google và lấy thông tin người dùng
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
    
            const payload = ticket.getPayload();
            const { sub: googleId, email, name: fullName, picture: profilePhoto } = payload;
    
            console.log("Google ID:", googleId);
            console.log("Email:", email);
    
            // Kiểm tra xem người dùng đã có tài khoản chưa
            let user = await User.findOne({ googleId });
    
            if (!user) {
                // Nếu chưa có tài khoản theo googleId, kiểm tra theo email
                user = await User.findOne({ email });
            }
    
            if (!user) {
                // Nếu người dùng chưa tồn tại, tạo tài khoản mới
                user = new User({
                    googleId,
                    email,
                    fullName,
                    profilePhoto,
                    role: 'Buyer',
                });
                await user.save();
            }
    
            // Tạo accessToken và refreshToken
            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);
    
            // Lưu refreshToken vào cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // Đặt `true` khi chạy trên HTTPS
                path: '/',
                sameSite: 'strict',
            });
    
            // Xóa mật khẩu trước khi trả về thông tin người dùng
            const { password, ...other } = user._doc;
            return res.status(200).json({ ...other, accessToken });
    
        } catch (err) {
            return res.status(500).json({
                message: 'Đăng nhập Google thất bại',
                error: err.message,
            });
        }
    },

    registerUser: async (req, res) => {
        try {
            // Kiểm tra số điện thoại đã tồn tại chưa
            const userPhone = await User.findOne({ phoneNumber: req?.body?.phoneNumber });
            if (userPhone) {
                return res.status(404).json("Số điện thoại đã có người sử dụng");
            }
    
            // Kiểm tra email đã tồn tại chưa
            const userEmail = await User.findOne({ email: req?.body?.email });
            if (userEmail) {
                return res.status(404).json("Email này đã được đăng ký, vui lòng sử dụng email khác");
            }
    
            // Tạo người dùng mới
            const newUser = new User({
                fullName: req?.body?.fullName,
                phoneNumber: req?.body?.phoneNumber,
                email: req?.body?.email,
                password: req?.body?.password,  // Lưu ý: Nên mã hóa mật khẩu trước khi lưu vào DB
                address: req?.body?.address
            });
    
            // Lưu người dùng vào cơ sở dữ liệu
            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    //GENERATE ACCESS TOKEN

    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            }, 
            process.env.JWT_ACCESS_KEY,
            {expiresIn: '30d'}
        )
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            }, 
            process.env.JWT_REFRESH_KEY,
            {expiresIn: '365d'}
        )
    },

    loginUser: async (req, res) => {
        try {
            console.log("Request Body:", req.body);
            const user = await User.findOne({
                $or: [
                    { phoneNumber: req?.body?.identifier },
                    { email: req?.body?.identifier }
                ]
            }).populate('vouchers').populate({
                path: 'orders',
                populate: {
                    path: 'orderItem'
                }
            });
    
            if (!user) {
                return res.status(404).json("Số điện thoại hoặc email không đúng");
            }
    
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
    
            if (!validPassword) {
                return res.status(404).json("Mật khẩu không đúng");
            }
            if (!user?.isActive) return res.status(404).json("Tài khoản của bạn đã bị khóa!");
    
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict'
                });
                const { password, ...other } = user._doc;
                return res.status(200).json({ ...other, accessToken });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    

    logoutUser: async (req, res) => {
        res.clearCookie("refreshToken");

        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);

        return res.status(200).json("Logout")
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) return res.status(401).json("You're not authenticated!")
        if(!refreshTokens.includes(refreshToken)) return res.status(403).json("Refresh token is not valid");
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) =>{
            if(err){
                console.log(err)
                return res.status(500).json(err)
            }

            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);

            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })

            return res.status(200).json({accessToken: newAccessToken})
        })
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
    
            // Kiểm tra email tồn tại
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Email không tồn tại trong hệ thống." });
            }
    
            // Tạo mật khẩu mới ngẫu nhiên
            const newPassword = Math.random().toString(36).slice(-6); // Tạo mật khẩu ngẫu nhiên với 6 ký tự
    
            // **Không hash mật khẩu** (chỉ để kiểm tra)
            user.password = newPassword;
    
            // Lưu mật khẩu mới vào cơ sở dữ liệu
            await user.save();
    
            // Kiểm tra mật khẩu trong cơ sở dữ liệu
            const updatedUser = await User.findOne({ email });
    
    
            // Gửi email thông báo mật khẩu mới
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADMIN,
                    pass: process.env.PASSWORD_EMAIL_ADMIN,
                },
            });
    
            const mailOptions = {
                from: `"WatchVIP Shop" <${process.env.EMAIL_ADMIN}>`,
                to: email,
                subject: 'Khôi phục mật khẩu - WatchVIP',
                text: `Xin chào ${user.fullName},\n\nĐây là mật khẩu mới của bạn: ${newPassword}\n\nHãy đăng nhập và đổi mật khẩu ngay để bảo mật tài khoản.\n\nTrân trọng,\nShop WatchVIP`,
            };
    
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Lỗi gửi email:', error);
                    return res.status(500).json({ message: "Không thể gửi email.", error });
                } else {
                    console.log('Email đã được gửi thành công:', info.response);
                    return res.status(200).json({ message: "Mật khẩu mới đã được gửi đến email của bạn." });
                }
            });
    
        } catch (err) {
            console.error("Lỗi server:", err);
            return res.status(500).json({ message: "Lỗi server.", error: err });
        }
    }
    
    
    
}

module.exports = authController;