const mongoose = require("mongoose")
const Bug = require("../models/bugModel")
const User = require("../models/userModel")





exports.getAllBugs = async (req, res) => {

    try {
        const currentUser = req.LogInUser
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
        const currentUser = req.LogInUser
        token = req.cookies.jwt
        console.log(token)
        const bugs = await Bug.find().populate('bugUserId');
        res.status(201).render('bugs/index',{
            bugs,currentUser
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
        const currentUser = req.LogInUser
        const testbug = await Bug.findOne({_id: req.params.id})
        const testuser = await User.findOne({id: testbug.bugUserId})
        console.log(testbug)
        console.log(testuser)
        res.status(201).render('bugs/updateBug',{
            testbug,testuser,currentUser
            });

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}
exports.testDetails = async (req, res) => {

    try {
        const currentUser = req.LogInUser
        const testbug = await Bug.findOne({_id: req.params.id})
        const testuser = await User.findOne({id: testbug.bugUserId})
        console.log(testbug)
        console.log(testuser)
        res.status(201).render('bugs/bugInformation',{
            testbug,testuser,currentUser
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
        const currentUser = req.LogInUser
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
        const currentUser = req.LogInUser
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
    console.log("Test one two three" + req.params)
    try {
        const currentUser = req.LogInUser
        const user = await User.findById(req.params.id);
        console.log(currentUser)
        res.status(201).render('bugs/createBug',{user,currentUser});

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
        const currentUser = req.LogInUser
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
        const currentUser = req.LogInUser
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
        const currentUser = req.LogInUser
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
        const currentUser = req.LogInUser
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
        const currentUser = req.LogInUser
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


exports.FilterTest = async (req, res) => {

    try {
        const currentUser = req.LogInUser
        const filterpick = req.query.filterlist
        console.log(filterpick)
        if(filterpick === 'userbug')
        {
            console.log('filter test part 1' + filterpick)
        }
        else if(filterpick === 'public')
        {
            const bugs = await Bug.find().where({bugPrivate: false}).populate('bugUserId');
    
            res.status(201).render('bugs/index',{
            bugs
            });
        }
        else if(filterpick === 'allbugs')
        {
            const bugs = await Bug.find().populate('bugUserId');
            
            res.status(201).render('bugs/index',{
            bugs
            });
        }

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}