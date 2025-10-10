const Task = require("../models/Task");
const Project = require("../models/Project");

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("projectId", "name status") // Include project details
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("projectId", "name description status");
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Task not found"
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, projectId, dueDate, tags } = req.body;
    
    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        error: "Please provide a task title"
      });
    }
    
    if (!projectId) {
      return res.status(400).json({
        success: false,
        error: "Please provide a project ID"
      });
    }
    
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      projectId,
      dueDate,
      tags
    });
    
    // Populate project details before sending response
    await task.populate("projectId", "name status");
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found"
      });
    }
    
    // If updating projectId, verify it exists
    if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          error: "Project not found"
        });
      }
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate("projectId", "name status");
    
    res.status(200).json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update task status only
// @route   PATCH /api/tasks/:id/status
// @access  Public
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Please provide a status"
      });
    }
    
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found"
      });
    }
    
    task.status = status;
    await task.save();
    
    await task.populate("projectId", "name status");
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found"
      });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get tasks by project ID
// @route   GET /api/tasks/project/:projectId
// @access  Public
const getTasksByProject = async (req, res) => {
  try {
    // First check if project exists
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    
    const tasks = await Task.find({ projectId: req.params.projectId })
      .populate("projectId", "name status")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      project: {
        id: project._id,
        name: project.name
      },
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Invalid project ID"
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get tasks by status
// @route   GET /api/tasks/status/:status
// @access  Public
const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    const tasks = await Task.find({ status })
      .populate("projectId", "name status")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      status: status,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get tasks by priority
// @route   GET /api/tasks/priority/:priority
// @access  Public
const getTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.params;
    
    const tasks = await Task.find({ priority })
      .populate("projectId", "name status")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      priority: priority,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Public
const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const todoTasks = await Task.countDocuments({ status: "todo" });
    const inProgressTasks = await Task.countDocuments({ status: "in-progress" });
    const doneTasks = await Task.countDocuments({ status: "done" });
    
    const highPriority = await Task.countDocuments({ priority: "high" });
    const mediumPriority = await Task.countDocuments({ priority: "medium" });
    const lowPriority = await Task.countDocuments({ priority: "low" });
    
    res.status(200).json({
      success: true,
      data: {
        total: totalTasks,
        byStatus: {
          todo: todoTasks,
          inProgress: inProgressTasks,
          done: doneTasks
        },
        byPriority: {
          high: highPriority,
          medium: mediumPriority,
          low: lowPriority
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
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
};