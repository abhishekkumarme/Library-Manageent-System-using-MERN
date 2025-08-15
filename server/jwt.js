const jwt = require('jsonwebtoken');

const singnature = "Abhi_signature"

const generateToken = ({_id,type} ) => {
    token =  jwt.sign({_id, type }, singnature);
    return token;
}   

const verifyToken = (token) => {
    try {
        const playLoad = jwt.verify(token, singnature);
        return {status:true, playLoad};
    } catch (error) {
        console.error("Token verification failed:", error);
        return {status:false, error: "undifinde"};
    }
}

module.exports = {
    generateToken,  verifyToken
};