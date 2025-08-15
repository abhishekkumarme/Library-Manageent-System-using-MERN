const userService = require('../services/user-service');
const User = require("../models/users");

const inputValidationException = require('../exception/inputValidationException');


const addNewUser = async (req, res) => {
   

    try {
        const {firstName, lastName, email, password, type} = req.body;
        let user = {
            firstName,
            lastName,               
            email,
            password,
            type: type,
        };
        user = await userService.addNewUser(user);
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.
        status(error instanceof inputValidationException ? 400 : 500)
        .send({message: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const data = await userService.loginUser(email, password);
        return res.status(200).send(data);
    } catch (error) {
        console.error(error);
        return res.
        status( 500)
        .send({message: error.message});
    }
};

const logoutUser = async (req, res) => {
    try{
    const {token} = req;
    let user = await User.findOne({_id: req.user._id});
    user.token = user.token.filter((t) => t.token !== token);
    await user.save();  
    return res.status(200).send();
    }catch (error) {
        console.error(error);
        return res.
        status( 500)
        .send({message: error.message});
    }
}

const getAllStudents= async (req, res) => {
    try {
        const students = await User.find({type: 'STUDENT'});
        return res.status(200).send(students);
    } catch (error) {
        console.error(error);
        return res.
        status( 500)
        .send({message: error.message});
    }
}

module.exports = {
    addNewUser, loginUser, logoutUser, getAllStudents,
}