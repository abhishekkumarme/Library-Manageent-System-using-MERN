const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');
const {encryptPassword, checkPassword} = require('../bcrypt');  
const {generateToken} = require('../jwt');

const userSchema = new Schema({
    firstName: { type: String, trim: true,required: true},
    lastName: { type: String, trim: true, required: true},
    email: { type: String, trim: true, required: true, unique: true, validate: {validator(email){isEmail(email)}} },
    password: { type: String, required: true, minlength: 8, trim: true, validate: {
        validator(pass){
            if(
                pass.includes(' ') ||
                pass.includes('\n') ||
                pass.includes('\t') 
            ){
            throw new Error("Password should not contain spaces or tabs");
            }
            if(pass.toLowerCase().includes('password')){    
                throw new Error("Password should not contain the word 'password'");
            } 
            return true;
        },
    } },   
    type: {type: String, enum: ['STUDENT','LIBRARIAN'], default: 'STUDENT'},  
    token: [{token: String}]  
    
}
)

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.modifiedPaths().includes('password')) {
       
            user.password = await encryptPassword(user.password);
       
    }
    next();
});

userSchema.statics.findByEmailAnPasswordForAuth = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {  
            throw new Error('Invalid email or password');
        }
        const encryptPassword = user.password;
        const isMatch = await checkPassword(password, encryptPassword);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }   
        console.log('login successful');
        return user;            
    } catch (error) {
        console.error( error);
        throw error;
    }                           
} 

userSchema.methods.generateToken = function () {
    const user = this;
    const token = generateToken(user);
    user.token.push({ token });
    user.save();
    return token;
}

userSchema.methods.toJSON = function () {
   
    let user = this.toObject();
    
    delete user.token;
    return user;
}   
    
const User = model('User', userSchema);     
module.exports = User;
