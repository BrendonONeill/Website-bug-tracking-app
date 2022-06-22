const mongoose = require("mongoose")
const User = require("../models/userModel")





exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        
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

exports.getOnlyAdmin = async (req, res) => {

    try {
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

exports.test2 = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        console.log(user)
        res.status(201).render('users/createUser',{user});

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.createUser = async (req, res) => {
    
    
    try {
        await User.create(req.body);
        res.status(201).redirect('http://localhost:3000/user');
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
    
};

exports.updateUser = async (req, res) => {
    
    
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body, {new:true});

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
    
};

exports.deleteUser = async (req, res) => {
    try {
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


exports.profile = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        
        res.status(201).render('users/profile',{
            user
            });

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}