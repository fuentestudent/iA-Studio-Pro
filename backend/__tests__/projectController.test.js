const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const Project = require('../models/projectModel');
const asyncHandler = require('express-async-handler');

// Mock Project model
jest.mock('../models/projectModel');

// Mock express-async-handler to directly execute the async function
jest.mock('express-async-handler', () => (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
});

describe('projectController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { _id: 'user123' }, // Mock authenticated user
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProject', () => {
    it('should create a new project on success', async () => {
      req.body = {
        name: 'Test Project',
        description: 'This is a test project',
        status: 'Active',
      };
      const mockProject = {
        _id: 'project123',
        user: 'user123',
        name: 'Test Project',
        description: 'This is a test project',
        status: 'Active',
      };
      Project.create.mockResolvedValue(mockProject);

      await createProject(req, res, next);

      expect(Project.create).toHaveBeenCalledWith({
        user: 'user123',
        name: 'Test Project',
        description: 'This is a test project',
        status: 'Active',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProject);
    });

    it('should return 400 if name or description are missing', async () => {
      req.body = { name: 'Test Project' }; // Missing description

      await createProject(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).toHaveBeenCalledWith(new Error('Please enter all fields'));
      expect(Project.create).not.toHaveBeenCalled();
    });
  });

  describe('getProjects', () => {
    it('should return all projects for the authenticated user', async () => {
      const mockProjects = [
        { _id: 'proj1', user: 'user123', name: 'Project 1' },
        { _id: 'proj2', user: 'user123', name: 'Project 2' },
      ];
      Project.find.mockResolvedValue(mockProjects);

      await getProjects(req, res, next);

      expect(Project.find).toHaveBeenCalledWith({ user: 'user123' });
      expect(res.json).toHaveBeenCalledWith(mockProjects);
    });
  });

  describe('getProjectById', () => {
    it('should return the project if found and authorized', async () => {
      req.params.id = 'project123';
      const mockProject = {
        _id: 'project123',
        user: 'user123',
        name: 'Test Project',
      };
      Project.findById.mockResolvedValue(mockProject);

      await getProjectById(req, res, next);

      expect(Project.findById).toHaveBeenCalledWith('project123');
      expect(res.json).toHaveBeenCalledWith(mockProject);
    });

    it('should return 404 if project not found', async () => {
      req.params.id = 'nonexistentId';
      Project.findById.mockResolvedValue(null);

      await getProjectById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(new Error('Project not found or not authorized'));
    });

    it('should return 404 if project not authorized', async () => {
      req.params.id = 'project123';
      const mockProject = {
        _id: 'project123',
        user: 'anotherUser',
        name: 'Test Project',
      };
      Project.findById.mockResolvedValue(mockProject);

      await getProjectById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(new Error('Project not found or not authorized'));
    });
  });

  describe('updateProject', () => {
    it('should update the project if found and authorized', async () => {
      req.params.id = 'project123';
      req.body = {
        name: 'Updated Project Name',
        description: 'Updated description',
        status: 'Completed',
      };
      const mockProject = {
        _id: 'project123',
        user: 'user123',
        name: 'Old Name',
        description: 'Old description',
        status: 'Active',
        save: jest.fn().mockImplementation(function() { return Promise.resolve(this); }),
      };
      Project.findById.mockResolvedValue(mockProject);

      await updateProject(req, res, next);

      expect(mockProject.name).toBe('Updated Project Name');
      expect(mockProject.description).toBe('Updated description');
      expect(mockProject.status).toBe('Completed');
      expect(mockProject.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockProject);
    });

    it('should return 404 if project not found or not authorized', async () => {
      req.params.id = 'nonexistentId';
      Project.findById.mockResolvedValue(null);

      await updateProject(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(new Error('Project not found or not authorized'));
    });
  });

  describe('deleteProject', () => {
    it('should delete the project if found and authorized', async () => {
      req.params.id = 'project123';
      const mockProject = {
        _id: 'project123',
        user: 'user123',
        name: 'Test Project',
        deleteOne: jest.fn().mockResolvedValue(true),
      };
      Project.findById.mockResolvedValue(mockProject);

      await deleteProject(req, res, next);

      expect(mockProject.deleteOne).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: 'Project removed' });
    });

    it('should return 404 if project not found or not authorized', async () => {
      req.params.id = 'nonexistentId';
      Project.findById.mockResolvedValue(null);

      await deleteProject(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(new Error('Project not found or not authorized'));
    });
  });
});