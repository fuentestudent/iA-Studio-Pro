const request = require('supertest');
const app = require('../../server'); // Assuming your Express app is exported from server.js
const mongoose = require('mongoose');
const User = require('../../models/userModel');
const Project = require('../../models/projectModel');

// Use a separate test database
const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/test_db_integrada';

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(MONGODB_URI_TEST, { serverSelectionTimeoutMS: 30000 });
  });

  afterEach(async () => {
    // Clean up the database after each test
    await User.deleteMany({});
    await Project.deleteMany({});
  });

  afterAll(async () => {
    // Disconnect from the database after all tests
    await mongoose.connection.close();
  });

  let authToken; // To store the token for authenticated requests

  describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('token');
      authToken = res.body.token; // Store token for subsequent tests
    });

    it('should not register a user with existing email', async () => {
      await request(app)
        .post('/api/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .post('/api/users')
        .send({
          name: 'Another User',
          email: 'test@example.com',
          password: 'password456',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('User already exists');
    });

    it('should authenticate an existing user', async () => {
      await request(app)
        .post('/api/users')
        .send({
          name: 'Test User',
          email: 'login@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('token');
    });

    it('should not authenticate with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual('Invalid email or password');
    });
  });

  describe('Project Endpoints', () => {
    let userId;

    beforeEach(async () => {
      // Register a user and get a token for authenticated requests
      const userRes = await request(app)
        .post('/api/users')
        .send({
          name: 'Project User',
          email: 'project@example.com',
          password: 'projectpassword',
        });
      authToken = userRes.body.token;
      userId = userRes.body._id;
    });

    it('should create a new project', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'My First Project',
          description: 'Description of my first project',
          status: 'Active',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toEqual('My First Project');
    });

    it('should get all projects for the authenticated user', async () => {
      // Create a project first
      await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Project to Get',
          description: 'Description',
          status: 'Active',
        });

      const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(1);
      expect(res.body[0].name).toEqual('Project to Get');
    });

    it('should get a single project by ID', async () => {
      const createRes = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Single Project',
          description: 'Description',
          status: 'Active',
        });
      const projectId = createRes.body._id;

      const res = await request(app)
        .get(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('Single Project');
    });

    it('should update a project', async () => {
      const createRes = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Project to Update',
          description: 'Old Description',
          status: 'Active',
        });
      const projectId = createRes.body._id;

      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Project Name',
          description: 'New Description',
          status: 'Completed',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('Updated Project Name');
      expect(res.body.description).toEqual('New Description');
      expect(res.body.status).toEqual('Completed');
    });

    it('should delete a project', async () => {
      const createRes = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Project to Delete',
          description: 'Description',
          status: 'Active',
        });
      const projectId = createRes.body._id;

      const res = await request(app)
        .delete(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Project removed');

      const getRes = await request(app)
        .get(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(getRes.statusCode).toEqual(404); // Should not find the deleted project
    });
  });

  // Add LLM Gateway tests here if applicable
  // For example:
  // describe('LLM Gateway Endpoints', () => {
  //   it('should optimize a prompt', async () => {
  //     const res = await request(app)
  //       .post('/api/llm/optimize') // Assuming this is your LLM endpoint
  //       .set('Authorization', `Bearer ${authToken}`) // If LLM endpoint is protected
  //       .send({ prompt: 'This is a test prompt.' });
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toHaveProperty('finalOptimizedPrompt');
  //   });
  // });
});