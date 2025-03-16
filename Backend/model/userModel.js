const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	id:{type:String,unique:true,require:true},
	email:{type:String,unique:true,require:true},
	password:{type:String,require:true},
	role:{type:String,require:true,enum:['User','Recruiter']}
})

const Usermodel = mongoose.model("user",UserSchema);

module.exports= {Usermodel}