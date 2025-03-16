const mongoose = require("mongoose")
const {Applicationmodel} = require("../model/applicationModel")

module.exports={	
    async postCandidateDetail(req,res){
		const {candidateId,jobId,resumeUrl,parsedFields} = req.body
		try{
		const lastRecord =await Applicationmodel.findOne().sort({id:-1})
		const id = lastRecord ? parseInt(lastRecord.id) + 1 : 1
				const strID = id.toString()
		const applyApplication = await Applicationmodel.create({id:strID,candidateId:candidateId,jobId:jobId,resumeUrl:resumeUrl,parsedFields:parsedFields})
		res.status(200).send({message:"Successfully Applyed to the job"})
		}catch(e){
			res.status(404).send({message:"Not Applyed"})
		}
	},

	async getappliedUserForRecuritor(req,res){
		const {candidateId,jobId}=req.query
		try{
			const findRecord =await Applicationmodel.find({candidateId:candidateId,jobId:jobId})
			if(findRecord.length>=0){
				res.status(200).send({message:"Applied Jobs",data:findRecord})
			}else{
				res.status(404).send({message:"no one Applyed"})
			}
		}catch(e){
			res.status(404).send({message:"error"})
		}
	}
}
