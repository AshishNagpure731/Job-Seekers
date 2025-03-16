const mongoose = require('mongoose')

const ApplicationSchema = mongoose.Schema({
	id:{type:String,unique:true,require:true},
	candidateId:{type:String,require:true},
	jobId:{type:String,require:true},
	parsedFields: {
    name: String,
    email: String,
    phone: String,                                                      
    education: [String],
   
    skills: [String],
    languages: [String],
    Description:String
  }
})

const Applicationmodel = mongoose.model("application",ApplicationSchema);
module.exports= {Applicationmodel}
