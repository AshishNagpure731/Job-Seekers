Here's a more readable and understandable version of the API documentation for your README file:

---

## API Testing

### Starting the Servers
1. Navigate to the backend directory and start the server:
   ```bash
   cd backend
   node server.js
   ```
2. Navigate to the jobseeker directory and start the frontend:
   ```bash
   cd jobseeker
   npm start
   ```

### User Registration and Login
1. **User Registration**:
   - Endpoint: `POST http://127.0.0.1:8000/auth/register`
   - Body:
     ```json
     {
       "email": "abc123",
       "password": "12345678",
       "role": "User" or "Recruiter" (choose only from this)
     }
     ```

2. **User Login**:
   - Endpoint: `POST http://127.0.0.1:8000/auth/login`
   - Body:
     ```json
     {
       "email": "abc",
       "password": "12345678"
     }
     ```
   - Note: This API generates a JWT token.

### JWT Token
- All APIs (except login and register) require a JWT token.
- Add the token in the header:
  ```
  "inx-access-token": token
  "Content-Type": "application/json"
  ```

### Job Seeker APIs
1. **Get All Jobs**:
   - Endpoint: `GET http://127.0.0.1:8000/jobs/getAlljob`

2. **Apply for a Job**:
   - Endpoint: `POST http://127.0.0.1:8000/applications/user`
   - Body:
     ```json
     {
       "candidateId": selectedJob.candidateId,
       "jobId": selectedJob.id,
       "parsedFields": {
         "name": name,
         "email": LoginData.data.email,
         "phone": phone,
         "education": [education],
         "skills": [skill],
         "languages": [language],
         "Description": description
       }
     }
     ```

### Recruiter APIs
1. **Create a New Job**:
   - Endpoint: `POST http://127.0.0.1:8000/jobs/newcreate`
   - Body:
     ```json
     {
       "candidateId": "Ashish",
       "title": "Software Developer",
       "description": "Want 1 Year Experience in Reactjs",
       "status": "Open",
       "role": "Recruiter"
     }
     ```

2. **Get Jobs Created by Recruiter**:
   - Endpoint: `GET http://127.0.0.1:8000/jobs/getCandidateJob?candidateId={recruiter-name}`

3. **View Applied Candidates**:
   - Endpoint: `GET http://127.0.0.1:8000/applications/appliedJobs?candidateId={recruiter-name}&jobId={job-number}`
   - Note: `{job-number}` is the ID of the job created and `{recruiter-name}` is the name of the recruiter.

4. **Delete a Job**:
   - Endpoint: `DELETE http://127.0.0.1:8000/jobs/deleteJob`
   - Body:
     ```json
     {
       "id": "1",
       "candidateId": "abc"
     }
     ```

5. **Update a Job**:
   - Endpoint: `POST http://127.0.0.1:8000/jobs/updateJob`
   - Body:
     ```json
     {
       "id": "1",
       "title": "Associate Job Developer",
       "description": "Want 1 year of experience",
       "status": "Open",
       "candidateId": recruiterID
     }
     ```

6. **View User Details for a Job**:
   - Endpoint: `GET http://127.0.0.1:8000/applications/appliedJobs?recruiter-name}&jobId={job-number}`

---
