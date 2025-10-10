const Project = require("../models/Project");

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Newest first
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Public
const createProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    
    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Please provide a project name"
      });
    }
    
    const project = await Project.create({
      name,
      description,
      status
    });
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    // Mongoose validation error
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

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Public
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    
    // Update fields
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // Return updated document
        runValidators: true  // Run model validations
      }
    );
    
    res.status(200).json({
      success: true,
      data: updatedProject
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

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Public
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    
    await Project.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get project statistics
// @route   GET /api/projects/stats
// @access  Public
const getProjectStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: "active" });
    const archivedProjects = await Project.countDocuments({ status: "archived" });
    
    res.status(200).json({
      success: true,
      data: {
        total: totalProjects,
        active: activeProjects,
        archived: archivedProjects
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
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats
};