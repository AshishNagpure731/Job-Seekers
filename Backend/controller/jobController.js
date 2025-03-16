const mongoose = require("mongoose")
const { Jobmodel } = require("../model/jobModel")

module.exports = {

	async postJob(req, res) {
		const { candidateId, title, description, status, role } = req.body  // here need role form user
		if (role === 'Recruiter') {
			try {
				const LastUserId = await Jobmodel.findOne().sort({ id: -1 }).limit(1)
				const id = LastUserId ? parseInt(LastUserId.id) + 1 : 1
				const strID = id.toString()
				const createJob = await new Jobmodel({ id: strID, title: title, candidateId: candidateId, description: description, status: status })
				await createJob.save()
				res.status(200).send({ message: "New Job is created Successfully", result: createJob })
			} catch (e) {
				res.status(404).send({ message: "Job is not created" })
			}
		} else {
			res.status(404).send({ message: "Please create Recruiter Account" })
		}
	},

	async getAllPostedJobs(req, res) {
		try {
			const AllJob = await Jobmodel.find()
			if (AllJob.length > 0) {
				res.status(200).send({ message: "Got All Jobs", result: AllJob })
			} else {
				res.status(404).send({ message: "No Job yet created" })
			}

		} catch (e) {
			res.status(404).send({ message: "Job is not created" })

		}
	}
	,

	async getParticularRecuritorJob(req,res){
		const{candidateId} = req.query
		try{
			const PostedJob =await Jobmodel.find({candidateId:candidateId})
			if(PostedJob.length>=0){
				res.status(200).send({message:`all jobs created by ${candidateId}`,data:PostedJob})
			}else{
				res.status(404).send({ message: "Job is not created yet" })
			}
		}catch(e){
			res.status(404).send({ message: "Error" })

		}

	} ,

	async deletePostedJob(req, res) {
		const { id, candidateId } = req.body
		try {
			const AllJob = await Jobmodel.findOneAndDelete({ id: id, candidateId: candidateId })
			res.status(200).send({ message: "Jobs deleted successfully" })
		} catch (e) {
			res.status(404).send({ message: "Job not deleted" })
		}
	}
	,
	async updatePostedJob(req, res) {
		const { id, title, description, status, candidateId } = req.body
		try {
			const updateJob = await Jobmodel.findOneAndUpdate({ id: id, candidateId: candidateId }, { $set: { title: title, description: description, status: status } }, { new: true, runValidators: true })
			
			res.status(200).send({ message: "Successfully Updated" })
		} catch (e) {
			res.status(404).send({ message: "Not Updated" })
		}
	}
}
