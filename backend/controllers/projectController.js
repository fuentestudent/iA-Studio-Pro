const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  const project = await Project.create({
    user: req.user._id, // User ID from auth middleware
    name,
    description,
    status,
  });

  res.status(201).json(project);
});

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
});

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project && project.user.toString() === req.user._id.toString()) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found or not authorized');
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;

  const project = await Project.findById(req.params.id);

  if (project && project.user.toString() === req.user._id.toString()) {
    project.name = name || project.name;
    project.description = description || project.description;
    project.status = status || project.status;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found or not authorized');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project && project.user.toString() === req.user._id.toString()) {
    await project.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found or not authorized');
  }
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};