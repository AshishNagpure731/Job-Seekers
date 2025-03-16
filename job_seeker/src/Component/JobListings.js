


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const JobListings = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [viewApplied, setViewApplied] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    language: "",
    description: ""
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const location = useLocation();
  const LoginData = location.state;

  const getAllPostedJobs = async () => {
    if (LoginData.auth) {
      let headersList = {
        "x-access-token": LoginData.token
      };

      let response = await fetch("http://127.0.0.1:8000/jobs/getAlljob", {
        method: "GET",
        headers: headersList
      });

      let data = await response.json();
      setJobs(data.result);
    }
  };

  useEffect(() => {
    getAllPostedJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const toApplyforJob =async(name,email,phone,education,skill,language,description)=>{
  let headersList = {
    "x-access-token": LoginData.token,
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify({
     "candidateId":selectedJob.candidateId,
     "jobId":selectedJob.id,
     "parsedFields":{
       "name":name,
       "email":LoginData.data.email,
       "phone":phone,
       "education":[education],
       "skills":[skill],
       "languages":[language],
       "Description":description
     }
   }
   
   
   
   );
   
   let response = await fetch("http://127.0.0.1:8000/applications/user", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.json();
  alert(data.message)
   
}
  const handleSubmit = () => {
    setAppliedJobs([...appliedJobs, { ...selectedJob, status: "Pending", ...formData }]);
    toApplyforJob(formData.name,formData.email,formData.phone,formData.education,formData.skills,formData.language,formData.description)
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "", education: "", skills: "", language: "", description: "" });
  };

  return (
    <div style={{ marginTop: "80px", width: "80%", background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", maxHeight: "400px", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <button style={{ padding: "10px", background: viewApplied ? "gray" : "#2a5298", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => setViewApplied(false)}>Job Listings</button>
        <button style={{ padding: "10px", background: viewApplied ? "#2a5298" : "gray", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => setViewApplied(true)}>Applied Jobs</button>
      </div>
      {viewApplied ? (
        <>
          <h2 style={{ textAlign: "center" }}>Applied Jobs</h2>
          {appliedJobs.length === 0 ? <p style={{ textAlign: "center" }}>No applied jobs yet.</p> : appliedJobs.map((job, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderBottom: "1px solid #ddd" }}>
              <span style={{ flex: 2, marginRight: "20px" }}><strong>{job.title}</strong>: {job.description}</span>
              <span style={{ flex: 1, color: "blue", textAlign: "center" }}>{job.status}</span>
              <button style={{ background: "gray", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "not-allowed" }} disabled>Applied</button>
            </div>
          ))}
        </>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>Job Listings</h2>
          {jobs.map((job, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderBottom: "1px solid #ddd" }}>
              <span style={{ flex: 2, marginRight: "20px" }}><strong>{job.title}</strong>: {job.description}</span>
              <span style={{ flex: 1, color: job.status === "Active" ? "green" : "red", textAlign: "center" }}>{job.status}</span>
              <button style={{ background: "#2a5298", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => handleApplyClick(job)} disabled={job.status !== "Open"}>Apply</button>
            </div>
          ))}
        </>
      )}
      {showModal && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>
    <div style={{
      background: "linear-gradient(to right, #1e3c72, #2a5298)",
      padding: "20px",
      borderRadius: "10px",
      width: "450px",
      color: "white",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Apply for {selectedJob.title}</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} 
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", outline: "none", fontSize: "16px", color: "#1e3c72", background: "#f0f0f0" }} 
        />
        {/* <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} 
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", outline: "none", fontSize: "16px", color: "#1e3c72", background: "#f0f0f0" }} 
        /> */}
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} 
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", outline: "none", fontSize: "16px", color: "#1e3c72", background: "#f0f0f0" }} 
        />
        <input type="text" name="education" placeholder="Education" value={formData.education} onChange={handleChange} 
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", outline: "none", fontSize: "16px", color: "#1e3c72", background: "#f0f0f0" }} 
        />
        <input type="text" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} 
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", outline: "none", fontSize: "16px", color: "#1e3c72", background: "#f0f0f0" }} 
        />
        <input type="text" name="language" placeholder="Language" value={formData.language} onChange={handleChange} 
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", outline: "none", fontSize: "16px", color: "#1e3c72", background: "#f0f0f0" }} 
        />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} 
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", outline: "none", fontSize: "16px", color: "#1e3c72", background: "#f0f0f0", height: "80px" }} 
        />
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button onClick={handleSubmit} 
          style={{ padding: "10px 15px", background: "#34c759", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", width: "48%" }}>
          Submit
        </button>
        <button onClick={() => setShowModal(false)} 
          style={{ padding: "10px 15px", background: "#ff3b30", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", width: "48%" }}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default JobListings;
