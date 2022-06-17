const mongoose =  require("mongoose");

const {Schema, SchemaTypes, model} = mongoose;




const bugSchema = new Schema({
    bugName: {type: String, required: true},
    bugUserId: {type: SchemaTypes.ObjectId, ref: "User", required: true},
    bugDes: {type: String, required: true},
    bugCode: {type: String, required: true},
    bugProject: {type: String, required: true},
    bugImportance: {type: Number, required: true, max: 5},
    dateBugCreated: {   type: Date,
        default: () => Date.now(),
        immutable: true},
    dateBugUpdated: Date,
    bugPrivate: {type: Boolean, required: true, default: true},
    Comments: [{
        userName: {type: SchemaTypes.ObjectId, ref: "User"},
        userComment: String
    }]
})

const Bug = model("Bug", bugSchema);
module.exports = Bug;