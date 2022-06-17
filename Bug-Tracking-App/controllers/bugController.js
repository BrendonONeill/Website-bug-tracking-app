const mongoose = require("mongoose")
const Bug = require("../models/bugModel")
const User = require("../models/userModel")





exports.getAllBugs = async (req, res) => {

    try {
        const bugs = await Bug.find();
        
        res.status(201).json({
            status: 'success',
            Bugs:  bugs.length,
            data: {
                bugs
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

exports.test = async (req, res) => {

    try {
        
        const bugs = await Bug.find().populate('bugUserId');
        
        res.status(201).render('bugs/index',{
            bugs
            });

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

exports.testUpdate = async (req, res) => {

    try {
        const testbug = await Bug.findOne({_id: req.params.id})
        const testuser = await User.findOne({id: testbug.bugUserId})
        console.log(testbug)
        console.log(testuser)
        res.status(201).render('bugs/updateBug',{
            testbug,testuser
            });

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

exports.publicBugs = async (req, res) => {

    try {
        
        const bugs = await Bug.find().where({bugPrivate: false}).populate('bugUserId');
        
        res.status(201).render('bugs/index',{
            bugs
            });

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

exports.UserBugs = async (req, res) => {

    try {
        
        const bugs = await Bug.find().where({bugUserId: req.params.id}).populate('bugUserId');
        
        res.status(201).render('bugs/index',{
            bugs
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
        res.status(201).render('bugs/createBug',{user});

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.filterAllBugs = async (req, res, next) => {

    try {
        const bugs = await Bug.find().where({bugPrivate: "true"})
        
        res.status(201).json({
            status: 'success',
            Bugs:  bugs.length,
            data: {
                bugs
            }
        });

        next();

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}






exports.getBug= async (req, res) => {

    try {
        const bug = await Bug.findById(req.params.id);
        
        res.status(201).json({
            status: 'success',
            data: {
                bug
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


exports.createBug = async (req, res) => {
    
    
    try {
        const userId = await User.findById(req.params.id)
        req.body.bugUserId = userId
        console.log(req.body)
        await Bug.create(req.body);
        res.status(201).redirect('http://localhost:3000/bug');

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
    
};

exports.updateBug = async (req, res) => {
    
    
    try {
        const bug = await Bug.findByIdAndUpdate(req.params.id,req.body, {new:true});
        await bug.save()
        res.status(201).redirect('http://localhost:3000/bug');

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
    
};

exports.deleteBug = async (req, res) => {
    try {
        await Bug.findByIdAndDelete(req.params.id);

        res.status(201).redirect('http://localhost:3000/bug');

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
};