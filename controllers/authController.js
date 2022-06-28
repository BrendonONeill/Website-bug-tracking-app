const {promisify} = require("util")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Bug = require("../models/bugModel");
require('dotenv').config()

//This creates a JWT token
const signJWTToken = id => {
    return jwt.sign({ id }, process.env.JWT_PASSWORD, {expiresIn: process.env.JWT_EXPIRED});
}

const createCookieToken = (user, statusCode, res) => {
    const token = signJWTToken(user._id)
    const cookieOptions = {
      expires: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    
  };



//This checks the users username and password before given them a token
exports.loginIn = async (req, res, next) => {
   
   try{
    const {email, password} = req.body;
    console.log(req.body)

    if(!email || !password)
    {
        throw new SyntaxError("access denided") 
    }

    const user = await User.findOne({email}).select("+password");
    if (!user || !(await user.correctPassword(password, user.password)))
    {
        throw new SyntaxError("access denided") 
    }

    createCookieToken(user, 200, res)
    console.log('token created')
    next()
   }
   catch(err)
   {
    console.error(err);
   }   
}

//This is when the user logs out 
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).render("login/login")
  };


//This makes sure the user is logged in before they can use the application 
exports.loginedCheck = async(req, res, next) => {
    
    try{
        //Check if users has a token
        let token
        if(req.cookies.jwt)
        {
            token = req.cookies.jwt;
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
//This is created to give the jwt time to be set up in the cookie before it it checked by the logined check
exports.justloggedin = async(req, res) => {
    
    try{
        res.redirect('../bug/')
    }
    catch(err)
    {

        console.error(err);
    }
    
 
    
}





// This checks the role of the user as admin can only view and update users
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//look into it

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
