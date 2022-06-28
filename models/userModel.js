const mongoose =  require("mongoose");
const {Schema, model} = mongoose;
const bcrypt = require("bcrypt")
var validator = require('validator')

const userSchema = new Schema({
    fname: 
    {type: String,
    required:true},
    lname: 
    {type: String,
    required:true},
    email:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'PLease proved email']
    },
    password:
    {
        type: String,
        required: true,
        minlength: 10,
        select: false
    },
    passwordConfirm:
    {
        type: String,
        required: true,
        validate: {validator: function(pas){
            return pas === this.password
        }, message:"Passwords are not the same"}
    },
    role:
    {type: String,
    enum: ["user","admin"],
    required:true,
    default:'user'},


    dateCreated: 
    {   type: Date,
        default: () => Date.now(),
        immutable: true},
    dateUpdated: Date,
});

userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function(passwordInput, userPassword)
{
    return await bcrypt.compare(passwordInput, userPassword);
}

const User = model("User", userSchema);
module.exports = User;