const User = require('../../model/user/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let refreshTokens = [];


const authController = {
    registerUser: async (req, res) => {
        try{
            const userPhone = await User.findOne({ phoneNumber: req?.body?.phoneNumber })
 
            if(userPhone){
                return res.status(404).json("Số điện thoại đã có người sử dụng");
            }

            // create usser
            const newuser = new User({
                fullName: req?.body?.fullName,
                phoneNumber: req?.body?.phoneNumber,
                email: req?.body?.email,
                password: req?.body?.password,
                address: req?.body?.address
            })

            // save to DB

            const user = await newuser.save()
            return res.status(200).json(user)
        }
        catch(err){
            return res.status(500).json(err)
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
    }
}

module.exports = authController;