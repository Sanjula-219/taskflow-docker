const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats
} = require("../controllers/projectController");

// Statistics route (must be before /:id)
router.get("/stats", getProjectStats);

// Basic CRUD routes
router.route("/")
  .get(getAllProjects)      // GET /api/projects
  .post(createProject);     // POST /api/projects

router.route("/:id")
  .get(getProjectById)      // GET /api/projects/:id
  .put(updateProject)       // PUT /api/projects/:id
  .delete(deleteProject);   // DELETE /api/projects/:id

module.exports = router;