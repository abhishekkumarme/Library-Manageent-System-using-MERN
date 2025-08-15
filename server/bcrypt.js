const bcrypt = require('bcrypt');

const encryptPassword = async (plainTextPassword) => {
    const saltRounds = 10;
    try {
        
       return await  bcrypt.hash(plainTextPassword, 10);
        
    } catch (error) {
        console.error("Error encrypting password:", error);
        throw error;
    }
    }

    const checkPassword = async (plainTextPassword, encryptedPassword) => {
        try {
            return await bcrypt.compare(plainTextPassword, encryptedPassword);
        } catch (error) {
            console.error("Error checking password:", error);
            throw error;
        }
    }
module.exports = {
    encryptPassword,  checkPassword
};