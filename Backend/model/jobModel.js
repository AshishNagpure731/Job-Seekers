const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
	id:{type:String,unique:true,require:true},
	candidateId:{type:String,require:true},
	title:{type:String,require:true},
	description:{type:String},
	status:{type:String,enum: ['Open', 'Closed'],
    default: 'Open'}
})

const Jobmodel = mongoose.model("job",JobSchema);
module.exports= {Jobmodel}