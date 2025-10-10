# 📖 Learning Journal - TaskFlow Docker Project

## Purpose
Document learnings, challenges, and solutions throughout the project.

---

## Day 1: Setup & Planning (30/09/2025)

### What I Did:
- Created GitHub repository
- Set up project structure
- Wrote initial documentation
- Planned week schedule

01.git init
git config --global init.defaultBranch main

git status
git add readme.md
gir commit -m 'add readme.md file'
gir status

creat file test 
git add ./
git commit -m 'add hello and test fils'

git log
git checkout <commit hash>
git checkout main
git checkour -f main

git branch -M main 
git remote add origin https:
git push -u origin main

### What I Learned:
- Project planning importance
- Repository structure best practices
- Documentation-first approach

### Challenges:
- None yet, just starting!

### Next Steps:
- Start building Node.js API tomorrow
- Research Express.js best practices
- Review MongoDB connection setup

---

## Day 2: Application Development (1/10/2025)

### What I Did:
01.Use app file
02.Create Folders- Src,config,controllers,models,routes,server.js
 Comparison Table:

Feature             server.js only             app.js + server.js 
Simplicity        ⭐⭐⭐⭐⭐ Simple        ⭐⭐⭐ Moderate
Testing           ❌ Hard                    ✅ Easy
Organization      ⭐⭐ Basic                 ⭐⭐⭐⭐⭐ Clean 
Professional      ⭐⭐ Learning              ⭐⭐⭐⭐⭐ Production 
Small Projects    ✅ Perfect                  ❌ Overkill 
Large Projects    ❌ Messy                    ✅ Ideal



03.cd taskflow-docker/app --> E:\13_taskflow-docker\app> 
04.npm init -y  
    Run npm initialization command
    Accept defaults or customize
    This creates package.json

05.Install dependencies:

npm install express mongeese cros dotenv

Express framework (web server)
Mongoose (MongoDB ODM)
dotenv (environment variables)
cors (API access from different origins)


06."dev": "nodemon server.js",
"start": "node server.js"
 
npm run dev=>Runs nodemon server.js.
You edit a route in server.js , Save → server restarts instantly.
👉 For development only.

npm start=>Runs node server.js.
In real deployment (e.g., on AWS, Docker, or a server), you want the app running normally without extra overhead from nodemon.

👉 For production / deployment.

✅ Summary:
dev → convenient for developers (auto-reload with nodemon).
start → stable and clean for production (just runs Node).

07.Environment Setup

i.Create .env file:

Variables you need:

PORT (3000)
MONGODB_URI (connection string)
NODE_ENV (development)


ii. Create .env.example:


Same structure as .env
But with placeholder values
This goes to Git (.env should be in .gitignore)

iii.Update .gitignore:
Make sure it includes:
 node_modules/
 .env
 logs/
 *.log

 08.database setup

 09.models setup
Models කියන්නේ DATA STRUCTURE එක define කරන තැන!

 Simple Analogy:
Database = Filing Cabinet (ගබඩාව)
Collection = Folder (ෆෝල්ඩරය)
Model = Template/Form (ආකෘතිය)
Document = Filled Form (පුරවපු ෆෝම් එක)

Model = එක එක document එකේ තියෙන්න ඕනේ මොනවද, කොහොමද කියලා define කරන template එක!

Your Task Now:

Create src/models/Project.js
Copy the Project model code
Understand each field
Save file

Create src/models/Task.js
Copy the Task model code
Understand references
Save file

10.Controllers = Business Logic

11.Routes = URL Mapping

Test with Postman or cURL:

POST http://localhost:3000/api/projects

{
  "name": "DevOps Learning",
  "description": "Master Docker and Kubernetes"
}

2. Get All Projects:
GET http://localhost:3000/api/projects

3. Create Task:

POST http://localhost:3000/api/tasks
Body: {
  "title": "Setup Docker",
  "description": "Create Dockerfile",
  "priority": "high",
  "projectId": "PROJECT_ID_FROM_STEP_1"
}
4. Get All Tasks:

GET http://localhost:3000/api/tasks


5. Update Task Status:

PATCH http://localhost:3000/api/tasks/TASK_ID/status
{
  "status": "in-progress"
}
6. Get Tasks by Project:

GET http://localhost:3000/api/tasks/project/PROJECT_ID


7. Get Statistics:

GET http://localhost:3000/api/projects/stats
GET http://localhost:3000/api/tasks/stats



### What I Learned:
🎯 Key Improvements:

1. Proper Middleware:

// ❌ WRONG - Sends response to everything
app.use("/", (req, res, next) => {
  res.send("Middleware Executed....");
});

// ✅ CORRECT - Parses JSON
app.use(express.json());

2. Database Separation:

// ❌ WRONG - Everything in server.js
mongoose.connect().then()...

// ✅ CORRECT - Separate file
const connectDB = require("./config/database");
connectDB();

3. Better Error Handling:

// ❌ WRONG
.catch((err) => console.log(err));

// ✅ CORRECT
.catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});

4. Database Name:

// ❌ WRONG - No database name
mongodb.net/

// ✅ CORRECT - With database name
mongodb.net/taskflow-db

Step 3: Test Endpoints

Test 1: Health Check
http://localhost:3000/health

Expected:
{
  "status": "healthy",
  "timestamp": "2025-10-02T...",
  "environment": "development"
}
Test 2: Welcome Route

http://localhost:3000/

Expected:

{
  "message": "Welcome to TaskFlow API! 🚀",
  "endpoints": {
    "health": "/health",
    "projects": "/api/projects",
    "tasks": "/api/tasks"
  }
}

Test 3: 404 Handler
http://localhost:3000/random

Expected:

{
  "error": "Route not found",
  "path": "/random"
}


02.


### Challenges & Solutions:

Node.js cannot find your server.js file
The file is either missing, renamed, or you're running the command from the wrong directory.

Quick fix: Make sure you're in the app folder and server.js exists there, or check if the file was accidentally renamed or deleted.


### Key Takeaways:



---

## Day 3: Docker Multi-stage Builds (DD/MM/YYYY)

### What I Did:

### What I Learned:

### Challenges & Solutions:

### Image Size Progress:
- Initial: ___ MB
- After optimization: ___ MB
- Reduction: ____%

---

## Day 4: Docker Compose (DD/MM/YYYY)

### What I Did:

### What I Learned:

### Challenges & Solutions:

---

## Day 5: Networking & Configuration (DD/MM/YYYY)

### What I Did:

### What I Learned:

### Challenges & Solutions:

---

## Day 6: Security & Monitoring (DD/MM/YYYY)

### What I Did:

### What I Learned:

### Challenges & Solutions:

---

## Day 7: Documentation & Polish (DD/MM/YYYY)

### What I Did:

### What I Learned:

### Overall Project Reflections:

---

## Key Learnings Summary

### Docker Concepts:
*(Will fill at the end)*

### Best Practices:
*(Will fill at the end)*

### Mistakes to Avoid:
*(Will fill at the end)*

### What I'd Do Differently:
*(Will fill at the end)*

---

**This journal will be valuable for:**
- Interview preparation
- Future projects
- Helping others
- Personal reference