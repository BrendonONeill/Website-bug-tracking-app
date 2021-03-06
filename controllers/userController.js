const mongoose = require("mongoose")
const User = require("../models/userModel")




// This gets all users and displays them in the main user section
exports.getAllUsers = async (req, res) => {

    try {
        console.log("Test Get all users")
        const currentUser = req.LogInUser
        const users = await User.find();
        const name = req.currentUser
        res.status(201).render('users/index',{
        users,currentUser,name});
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

// This brings an admin to a form to create a new user 
exports.createNewUser = async (req, res) => {

    try {
        console.log("Test Creating user")
        const currentUser = req.LogInUser
        const name = req.currentUser
        const user = await User.findById(req.params.id);
        res.status(201).render('users/createUser',{user, currentUser,name});
    }
    catch(err){
        next(err)
    }
}

//This creates the user after the admin fill in form
exports.createUser = async (req, res, next) => {
    try {
        console.log("Test user created")
        req.type = 'create'
        await User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
        });
        res.status(201).redirect('http://localhost:3000/user');
    }
    catch(err){
        next(err)
    } 
};

// This brings admins to a edit form to change the users information
exports.updateUser = async (req, res) => {
    try {
        console.log("Test Editing User")
        const currentUser = req.LogInUser
        const name = req.currentUser
        const updateUser = await User.findOne({_id: req.params.id})
        res.status(201).render('users/updateUser',{
            updateUser,currentUser,name
            });
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

// This updates the user document if the password left empty it doesnt change their password
exports.updateUserData = async (req, res,next) => {
    try {
        console.log("Test user edited")
        console.log(req.body)
        req.type = 'update'
        if(req.body.password === '')
        {
            delete req.body.password;
            delete req.body.passwordConfirm;
            const user = await User.findByIdAndUpdate(req.params.id,{$set : req.body}, {new:true}).select('+password');
            await user.save({ validateBeforeSave: false })
            res.status(201).redirect('http://localhost:3000/user');
        }
        else if(req.body.password === req.body.password)
        {
            const user = await User.findByIdAndUpdate(req.params.id,{$set : req.body}, {new:true}).select('+password');
            await user.save({ validateBeforeSave: true })
            res.status(201).redirect('http://localhost:3000/user');
            

        }
        else
        {
            throw new SyntaxError("can you not read")
        }
        
        
        
    }
    catch(err){
        next(err)
    }
};

//This deletes a user will put a modal to make sure they want to delete it
exports.deleteUser = async (req, res) => {
    try {
        console.log("Test Deleted User")
        await User.findByIdAndDelete(req.params.id);
        res.status(201).redirect('http://localhost:3000/user');

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
};

//This opens up the users profile
exports.profile = async (req, res) => {
    try {
        console.log("Test Profile")
        const currentUser = req.LogInUser
        const name = req.currentUser
        const user = await User.findById(req.params.id);
        res.status(201).render('users/profile',{
            user, currentUser, name
            });
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

//Filter and Sort
exports.filterAndSort = async (req, res) => {

    try {
        const currentUser = req.LogInUser
        const name = req.currentUser
        const filterpick = req.query.filterlist
        const sortpick = req.query.sortlist
        if(filterpick === 'allUsers')
        {
            if(sortpick  === 'none')
            {
                users = await User.find();
            }
            else if(sortpick  === 'name')
            {
                users = await User.find().sort({fname: 1});
            }
            else if(sortpick  === 'date')
            {
                users = await User.find().sort({dateCreated: 1});
            }
            else if(sortpick  === 'role')
            {
                users = await User.find().sort({role: 1})
            }
            
        }
        else if(filterpick === 'admins')
        {
            if(sortpick  === 'none')
            {
                users = await User.find().where({role: 'admin'});
            }
            else if(sortpick  === 'name')
            {
                users = await User.find().where({role: 'admin'}).sort({fname: 1});
            }
            else if(sortpick  === 'date')
            {
                users = await User.find().where({role: 'admin'}).sort({dateCreated: 1});
            }
            else if(sortpick  === 'role')
            {
                users = await User.find().where({role: 'admin'}).sort({role: 1})
            }
            
           
        }
        else if(filterpick === 'users')
        {
            if(sortpick  === 'none')
            {
                users = await User.find().where({role: 'user'});
            }
            else if(sortpick  === 'name')
            {
                users = await User.find().where({role: 'user'}).sort({fname: 1});
            }
            else if(sortpick  === 'date')
            {
                users = await User.find().where({role: 'user'}).sort({dateCreated: 1});
            }
            else if(sortpick  === 'role')
            {
                users = await User.find().where({role: 'user'}).sort({role: 1})
            }
            
        }
             res.status(201).render('users/index',{
             users, currentUser, name
             });

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}












// Could bes test content for filtering an stuff

exports.getOnlyAdmin = async (req, res) => {

    try {
        console.log("Test 2 checking....")
        const currentUser = req.LogInUser
        const users = await User.find().where({role: "admin"});
        
        res.status(201).render('users/index',{
        users});

        

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.getOnlyUser = async (req, res) => {

    try {
        console.log("Test 3 checking....")
        const currentUser = req.LogInUser
        const users = await User.find().where({role: "user"});
        
        res.status(201).render('users/index',{
        users});

        

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.getUser = async (req, res) => {

    try {
        console.log("Test 4 checking....")
        const currentUser = req.LogInUser
        const user = await User.findById(req.params.id);
        
        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        });

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

























