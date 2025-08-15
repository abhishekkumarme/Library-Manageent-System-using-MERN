const {verifyToken} = require("../jwt");
const user = require("../models/users");

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.substring(7); 
    const { status, playLoad } = verifyToken(token);
    const errorData = {
        message: "Unauthorized access",
    };
    if(status){
        const {_id } = playLoad;
        const userData = await user.findOne({_id});
        if(userData){
            req.user = userData;
            req.token = token;
            next();
    }else{
        return res.status(403).send(errorData);
    }
}else{
        return res.status(403).send(errorData);
    }
};

module.exports = authMiddleware;