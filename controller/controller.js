//imports
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//create a token after loggin in
const createToken = (_id) =>{
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}   

//login user
const loginUser = async(req, res) => {
    const{email, password} = req.body;

    try{
        const user = await User.login(email, password);

        //create a token
        const token = createToken(user._id);

        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async(req, res) =>{
    const {name, email, password} = req.body;
    
    try{
        const user = await User.signup(name, email, password);
    
        //create a token
        const token = createToken(user._id);
    
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }   
}

//place order
const order = async(req, res) =>{
    const {email, order} = req.body;

    if(!order){
        return res.status(400).json({error: "Your cart is empty!"})
    }

    try{
        const updatedOrder = await User.updateOne({ email }, { $push: { orders: order } });
        res.status(200).json(updatedOrder)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


module.exports = {signupUser, loginUser, order};