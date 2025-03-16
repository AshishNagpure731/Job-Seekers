const express = require('express');
const userController = require('../controller/userController.js');
const jobController = require('../controller/jobController.js');
const applicationController = require('../controller/applicationController.js');
const verifyToken = require('../controller/authMiddleware.js')

const router = express.Router();

// userAuth
router.post('/auth/register', userController.registerUser);
router.post('/auth/login', userController.verifyUser);

// jobController
router.post('/jobs/newcreate',verifyToken, jobController.postJob);
router.get('/jobs/getAlljob',verifyToken, jobController.getAllPostedJobs);
router.get('/jobs/getCandidateJob',verifyToken,jobController.getParticularRecuritorJob) // using req.query /jobs/getCandidateJob?email=123
router.delete('/jobs/deleteJob',verifyToken, jobController.deletePostedJob);
router.put('/jobs/updateJob',verifyToken, jobController.updatePostedJob);

// applicationController
router.post('/applications/user',verifyToken, applicationController.postCandidateDetail);
router.get('/applications/appliedJobs',verifyToken,applicationController.getappliedUserForRecuritor) // using query /applications/appliedJobs?candidateId=Ashish&jobId=1

module.exports = router;