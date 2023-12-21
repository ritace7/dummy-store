//imports
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//order model
const orderSchema = new Schema({
    items: {
        type: [String],
        required: true
    },
    total:{
        type: Number
    }
})

//user model
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    orders: {
        type: [orderSchema]
    }
})

//static signup method
userSchema.statics.signup = async function(name, email, password){

    //validation
    if(!name || !email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    
    if(!validator.isStrongPassword){
        throw Error('Please enter a strong password')
    }

    //check if email exists in db
    const exists = await this.findOne({email});
    if(exists){
        throw Error('Email already is use');
    }

    //hashing the pw
    const salt = await bcrypt.genSalt(10);
    const hash = await  bcrypt.hash(password, salt);

    const user = await this.create({name, email, password: hash});

    return user;
}

//static login method
userSchema.statics.login = async function(email, password){

    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    //check if email exists in db
    const user = await this.findOne({email});
    if(!user){
        throw Error('Incorrect email');
    }

    //match password
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Incorrect password');
    }

    //if valid, return the user
    return user;
}

module.exports = mongoose.model('User', userSchema);