const jwt = require("jsonwebtoken")

const verify = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;

        if(token){

            // header: brearer 1234564646464684sdf3s
            const accessToken = token.split(" ")[1];

            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err){
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            })
        }
        else{
            return res.status(401).json("You're not authenticated");
        }
    },
    verifyTokenAndAdmin: (req, res, next) => {
        verify.verifyToken(req, res, () => {
            if(req.user.id == req.params.id || req.user.role == "admin"){
                next();
            }
            else{
                return res.status(403).json("You are not allowed to request this!");
            }
        })
    }
}

module.exports = verify;