const mongoose = require("mongoose")
const Bug = require("../models/bugModel")
const User = require("../models/userModel")




// Gets all bugs from the database and dsiplay them in the main bugs section
exports.getBugsMain = async (req, res) => {

    try {
        console.log("Test Viewing Bugs")
        const currentUser = req.LogInUser
        const name = req.currentUser
        token = req.cookies.jwt
        
        const bugs = await Bug.find().populate('bugUserId');
        res.status(201).render('bugs/index',{
            bugs,currentUser, name
            });
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

// This is brings the user to a form to create a new bug
exports.createUserBug = async (req, res) => {
    console.log("Test Creating bug")
   
    try {
        const currentUser = req.LogInUser
        const name = req.currentUser
        const user = await User.findById(req.params.id);
        res.status(201).render('bugs/createBug',{user,currentUser,name});
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

// This creates the bug documnet after the user inputs their information into the form
exports.createBug = async (req, res) => {
    try {
        console.log("Test Bug Created")
        const userId = await User.findById(req.params.id)
        req.body.bugUserId = userId
        if(req.body.bugPrivate === 'public')
        {
            req.body.bugPrivate = false;
        }
        else
        {
            req.body.bugPrivate = true;
        }
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

// This brings users to the another page where more details are given on the current bug
exports.expandBugDetails = async (req, res) => {
    try {
        console.log("Test Expanding Bug Content")
        const currentUser = req.LogInUser
        const name = req.currentUser
        const bug = await Bug.findOne({_id: req.params.id})
        const user = await User.findOne({id: bug.bugUserId})
        res.status(201).render('bugs/bugInformation',{
            bug,user,currentUser,name
            });
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

//This brings user to another page with a form to edit the current bug document
exports.updateUserBug = async (req, res) => {

    try {
        console.log("Test updating bug")
        const currentUser = req.LogInUser
        const name = req.currentUser
        const bug = await Bug.findOne({_id: req.params.id})
        const user = await User.findOne({id: bug.bugUserId})
        res.status(201).render('bugs/updateBug',{
            bug,user,currentUser,name
            });
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

// This updates the bug documnet after the user inputs their information into the form
exports.updateBug = async (req, res) => {
    try {
        console.log("Test updated bug")
        if(req.body.bugPrivate === 'public')
        {
            req.body.bugPrivate = false;
        }
        else
        {
            req.body.bugPrivate = true;
        }
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

//This deletes the current selected bug will implement a modal to make sure you wanted to delete bug
exports.deleteBug = async (req, res) => {
    try {
        console.log("Test Bug Deleted")
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

//When a user is deleted this deletes all the users bugs
exports.deleteUsersBug = async (req, res,next) => {
    try {
        console.log("Test 13 check.....")
        await Bug.deleteMany({}).where({bugUserId: req.params.id});
        next()
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
};

//Filter and Sort
exports.filterAndSort = async (req, res) => {

    try {
        const currentUser = req.LogInUser
        const name = req.currentUser
        const filterpick = req.query.filterlist
        const sortpick = req.query.sortlist
        if(filterpick === 'userbug')
        {
            if(sortpick  === 'none')
            {
                bugs = await Bug.find().where({bugUserId: currentUser.id}).populate('bugUserId');
            }
            else if(sortpick  === 'importance')
            {
                bugs = await Bug.find().where({bugUserId: currentUser.id}).sort({bugImportance: -1}).populate('bugUserId');
            }
            else if(sortpick  === 'bugName')
            {
                bugs = await Bug.find().where({bugUserId: currentUser.id}).sort({bugName: 1}).populate('bugUserId');
            }
            else if(sortpick  === 'date')
            {
                bugs = await Bug.find().where({bugUserId: currentUser.id}).sort({dateBugCreated: 1}).populate('bugUserId');
            }
            
        }
        else if(filterpick === 'public')
        {
            if(sortpick  === 'none')
            {
                bugs = await Bug.find().where({bugPrivate: false}).populate('bugUserId')
            }
            else if(sortpick  === 'importance')
            {
                bugs = await Bug.find().where({bugPrivate: false}).populate('bugUserId').sort({bugImportance: -1});
            }
            else if(sortpick  === 'bugName')
            {
                bugs = await Bug.find().where({bugPrivate: false}).populate('bugUserId').sort({bugName: 1});
            }
            else if(sortpick  === 'date')
            {
                bugs = await Bug.find().where({bugPrivate: false}).populate('bugUserId').sort({dateBugCreated: 1});
            }
           
        }
        else if(filterpick === 'allbugs')
        {
            if(sortpick  === 'none')
            {
                bugs = await Bug.find().populate('bugUserId').populate('bugUserId')
            }
            else if(sortpick  === 'importance')
            {
                bugs = await Bug.find().populate('bugUserId').sort({bugImportance: -1});
            }
            else if(sortpick  === 'bugName')
            {
                bugs = await Bug.find().populate('bugUserId').sort({bugName: 1});
            }
            else if(sortpick  === 'date')
            {
                bugs = await Bug.find().populate('bugUserId').sort({dateBugCreated: 1});
            }
            
        }
             res.status(201).render('bugs/index',{
             bugs, currentUser, name
             });

    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}











// Look through this could mostly be test code

exports.getAllBugs = async (req, res) => {

    try {
        const currentUser = req.LogInUser
        const bugs = await Bug.find();
        console.log("Test 1 check.....")
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






exports.publicBugs = async (req, res) => {

    try {
        console.log("Test 5 check.....")
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
        console.log("Test 6 check.....")
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





exports.filterAllBugs = async (req, res, next) => {

    try {
        console.log("Test 8 check.....")
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
        console.log("Test 9 check.....")
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











