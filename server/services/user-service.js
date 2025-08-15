const User = require('../models/users');
const inputValidationException = require('../exception/inputValidationException');

const addNewUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        console.log(`User with id ${user._id} created successfully`);
        const token = await user.generateToken();
        return { user, token };
    } catch (error) {
        console.error(`Please enter a valid field. The error is: ${error.message}`);
        throw new inputValidationException(error.message);
    }
}

const loginUser = async (email, password) => {
   
        const user = await User.findByEmailAnPasswordForAuth(email, password);
        console.log(`User with id ${user._id} logged in successfully`);
        const token = await user.generateToken();
        return { user, token };
    
    }


module.exports = {
    addNewUser,  loginUser,       
}
