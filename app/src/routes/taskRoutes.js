const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTasksByProject,
  getTasksByStatus,
  getTasksByPriority,
  getTaskStats
} = require("../controllers/taskController");

// Special routes (must be before /:id)
router.get("/stats", getTaskStats);
router.get("/project/:projectId", getTasksByProject);
router.get("/status/:status", getTasksByStatus);
router.get("/priority/:priority", getTasksByPriority);

// Basic CRUD routes
router.route("/")
  .get(getAllTasks)    // GET /api/tasks
  .post(createTask);   // POST /api/tasks

router.route("/:id")
  .get(getTaskById)    // GET /api/tasks/:id
  .put(updateTask)     // PUT /api/tasks/:id
  .delete(deleteTask); // DELETE /api/tasks/:id

// Status update route
router.patch("/:id/status", updateTaskStatus); // PATCH /api/tasks/:id/status

module.exports = router;