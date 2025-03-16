import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';


const RecruiterManage = () => {
  const [jobs, setjobs] = useState([])
  const [applicants, setapplicants] = useState([])
  const [showPopup, setShowPopup] = useState(false);//
  // const [newJob, setNewJob] = useState({ title: "", description: "" });/
  const [toEditJob, settoEditJob] = useState(false)
  const [title, settitle] = useState("")
  const [description, setdescription] = useState('')
  const [JobStatus, setJobStatus] = useState("")
  const [renderThepage, setrenderThepage] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedApplicant, setExpandedApplicant] = useState(null);
  const Location = useLocation()
  const LoginData = Location.state

  const jobsCreatedbyRecuritor = async () => {
    let headersList = {
      "x-access-token": LoginData.token
    }

    let response = await fetch(`http://127.0.0.1:8000/jobs/getCandidateJob?candidateId=${LoginData.data.email}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    setjobs(data.data)

  }
  const getAppliedJobs = async (job) => {
    let headersList = {
      "x-access-token": LoginData.token
    }

    let response = await fetch(`http://127.0.0.1:8000/applications/appliedJobs?candidateId=${LoginData.data.email}&jobId=${job.id}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    setapplicants(data.data)
  }
  useEffect(() => {
    jobsCreatedbyRecuritor()
  }, [LoginData, renderThepage]) //changing here something
  const handleManageApplications = (job) => {
    setSelectedJob(job)
    getAppliedJobs(job)
  }

  const createNewJob = async () => {
    let headersList = {
      "x-access-token": LoginData.token,
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({

      "candidateId": LoginData.data.email,
      "title": title,
      "description": description,
      "status": "Open",
      "role": "Recruiter"

    });

    let response = await fetch("http://127.0.0.1:8000/jobs/newcreate", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    alert(data.message);
    setrenderThepage(!renderThepage)

  }

  const handleSaveJob = () => {
    if (title !== '') {
      createNewJob()
      setShowPopup(false)
    }
  }
  const [getToEditTheJobDetails, setgetToEditTheJobDetails] = useState()
  const handleEditJob = (job) => {
    setgetToEditTheJobDetails(job)
    settoEditJob(true)
  }

  const handleStatusChange = async (jobID, newStatus, candidateId) => {
    if (newStatus !== "Select Status of Job" && newStatus !== getToEditTheJobDetails.status) {
      let headersList = {
        "x-access-token": LoginData.token,
        "Content-Type": "application/json"
      }

      let bodyContent = JSON.stringify(
        {
          "id": jobID,
          "title": getToEditTheJobDetails.title,
          "description": getToEditTheJobDetails.description,
          "status": newStatus,
          "candidateId": candidateId
        }
      );

      let response = await fetch("http://127.0.0.1:8000/jobs/updateJob", {
        method: "PUT",
        body: bodyContent,
        headers: headersList
      });

      let data = await response.json();
      setrenderThepage(!renderThepage)
    }

  }

  const handleDeleteJob = async (job) => {
    let headersList = {
      "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFzaGlzaCIsImlhdCI6MTc0MTk2OTE4OSwiZXhwIjoxNzQyMDU1NTg5fQ.0DHj99YMf6Zdgv_GhRXCK5d3MvffH2lbSC6xa-7tSOo",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "id": job.id,
      "candidateId": job.candidateId

    });

    let response = await fetch("http://127.0.0.1:8000/jobs/deleteJob", {
      method: "DELETE",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    alert(data.message)
    setrenderThepage(!renderThepage)

  }

  return (
    <div style={{
      marginTop: "80px",
      width: "80%",
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      maxHeight: "600px",
      overflowY: "auto",
      position: "relative"
    }}>
      <h2 style={{ textAlign: "center" }}>Recruiter Dashboard</h2>
      {/*  */}
      <button onClick={() => setShowPopup(true)} style={{
        background: "#2a5298",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "20px",
        position: "absolute",
        top: "10px",
        right: "10px"
      }}>+</button>
      {/*  */}
      <div>
        <button onClick={() => setSelectedJob(null)} style={{
          marginRight: "10px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          background: selectedJob === null ? "#2a5298" : "#ccc",
          color: "white"
        }}>Dashboard</button>
        <button disabled={!selectedJob} style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: selectedJob ? "pointer" : "not-allowed",
          background: selectedJob ? "#2a5298" : "#ccc",
          color: "white"
        }}>Job Manage</button>
      </div>
      {!selectedJob ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ background: "#2a5298", color: "white" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Title</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Description</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{job.title}</td>
                <td style={{ padding: "10px" }}>{job.description}</td>
                <td style={{ padding: "10px" }}>
                  {/* <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value, job.title, job.description, job.candidateId)}
                    style={{
                      background: job.status === "Open" ? "green" : "gray",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    <option value="Close">Closed</option>
                    <option value="Open">Open</option>
                  </select> */}
                  <button style={{
                    background: job.status === "Open" ? "green" : "gray",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",

                  }}>{job.status}</button>
                </td>
                <td style={{ padding: "10px" }}>
                  <button onClick={() => handleManageApplications(job)} style={{//() => setSelectedJob(job)
                    background: "#2a5298",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}>View/Manage Applications</button>
                  <button
                    onClick={() => handleEditJob(job)}
                    style={{
                      background: "#f39c12",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job)}
                    style={{
                      background: "#f39c12",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    Delete Job
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h3>Applicants for {selectedJob.role}</h3>
          <button onClick={() => setSelectedJob(null)} style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px"
          }}>Close</button>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ background: "#2a5298", color: "white" }}>
                <th>Name</th><th>Email</th><th>Phone</th><th>Education</th>
              </tr>
            </thead>

            <tbody>
              {applicants && applicants.map((applicant, index) => (//selectedJob.
                <React.Fragment key={index}>
                  <tr onClick={() => setExpandedApplicant(expandedApplicant === index ? null : index)} style={{ cursor: "pointer", borderBottom: "1px solid #ddd", background: expandedApplicant === index ? "#f0f0f0" : "white" }}>
                    <td style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{applicant.parsedFields.name}</td>
                    <td style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{applicant.parsedFields.email}</td>
                    <td style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{applicant.parsedFields.phone}</td>
                    <td style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{applicant.parsedFields.education}</td>
                  </tr>
                  {expandedApplicant === index && (
                    <tr><td colSpan="4" style={{ padding: "10px", background: "#e6e6e6" }}>Skills: {applicant.parsedFields.skills} | Description: {applicant.parsedFields.Description}</td></tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/*  */}
      {showPopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            background: "white", padding: "20px", borderRadius: "10px", width: "300px",
            display: "flex", flexDirection: "column", gap: "10px"
          }}>
            <h3>Create New Job</h3>
            <input type="text" placeholder="Title" onChange={e => settitle(e.target.value)} style={{ padding: "8px" }} />
            <textarea placeholder="Description" onChange={e => setdescription(e.target.value)} style={{ padding: "8px" }} />
            <button onClick={handleSaveJob} style={{ background: "#2a5298", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Save</button>
            <button onClick={() => setShowPopup(false)} style={{ background: "red", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}


      {toEditJob && getToEditTheJobDetails && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            background: "white", padding: "20px", borderRadius: "10px", width: "300px",
            display: "flex", flexDirection: "column", gap: "10px"
          }}>
            <h3>Edit Job</h3>
            <input
              type="text"
              placeholder="Title"
              value={getToEditTheJobDetails.title}
              disabled
              // onChange={e => settitle(e.target.value)}
              style={{ padding: "8px" }}
            />
            <textarea
              // placeholder="Description"
              value={getToEditTheJobDetails.description}
              disabled
              // onChange={e => setdescription(description?description: getToEditTheJobDetails.description)}
              style={{ padding: "8px" }}
            />
            <select
              // value={getToEditTheJobDetails.status}
              onChange={e => setJobStatus(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                // background: getToEditTheJobDetails.status === "Open" ? "green" : "gray",
                // color: "white"
                color: 'black'
              }}
            >
              <option value={null}>Select Status of Job</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => settoEditJob(false)}
                style={{ background: "red", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                disabled={JobStatus === getToEditTheJobDetails.status || JobStatus === "Select Status of Job"}
                onClick={() => {
                  // Add your job update logic here
                  handleStatusChange(getToEditTheJobDetails.id, JobStatus, getToEditTheJobDetails.candidateId)
                  settoEditJob(false);
                }}
                style={{
                  background: JobStatus === getToEditTheJobDetails.status || JobStatus === "Select Status of Job" ? 'grey' : "#2a5298", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer"
                }}
              >
                Update Job
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};







export default RecruiterManage
