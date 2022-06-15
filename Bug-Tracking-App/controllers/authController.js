const {promisify} = require("util")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Bug = require("../models/bugModel");
require('dotenv').config()


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_PASSWORD, {expiresIn: process.env.JWT_EXPIRED});
}

exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
})

    
    const token = signToken(newUser._id)

    res.status(201).json({
        status: 'success',
        token,
        data:{
            user: newUser
        }
    });
}

exports.loginIn = async (req, res, next) => {
   
   try{
    const {email, password} = req.body;


    if(!email || !password)
    {
        throw new SyntaxError("failed")   
    }

    const user = await User.findOne({email}).select("+password");
    if (!user || !(await user.correctPassword(password, user.password)))
    {
        throw new SyntaxError("access denided") 
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token
    })
   }
   catch(err)
   {
    console.error(err);
   }
   
    
}


exports.loginedCheck = async(req, res, next) => {
    
    try{
        //Check if users has a token
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token)
        {
            throw new SyntaxError("access denided") 
        }
        //Verify the users token
        const codeVerify = await promisify(jwt.verify)(token, process.env.JWT_PASSWORD)
        // Check if user still in database
        const userInDataBase = await User.findById(codeVerify.id);
        if(!userInDataBase)
        {
            throw new SyntaxError("access denided") 
        }
        req.LogInUser = userInDataBase
        req.LogInUserId = userInDataBase.id
        next();
    }
    catch(err)
    {

        console.error(err);
    }
    
 
    
}

exports.levelOfLogin = (...admin) => {
    try{

    
    return (req, res, next) => 
    {
        if(!admin.includes(req.LogInUser.role))
        {
            throw new SyntaxError("access denided") 
        }
        next()
    }
    
    }
    catch(err)
    {
        console.error(err);
    }

}

exports.bugCreator = async(req, res, next) => {

    try {
        let bugId = req.params.id;
        const bugObject = await Bug.findById(bugId);
        console.log((bugObject.bugUserId.toString()) === (req.LogInUserId))
        if((bugObject.bugUserId.toString()) !== (req.LogInUserId))
        {
            throw new SyntaxError("access denided")
        }
        console.log("cat")
        next()
        

    } 
    catch (err) 
    {
        console.error(err);
    }
}
