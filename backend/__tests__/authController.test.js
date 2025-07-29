const { authUser, registerUser } = require('../controllers/authController');
const User = require('../models/userModel');
const generateToken = require('../utils/tokenHelper');
const asyncHandler = require('express-async-handler');

// Mock User model
jest.mock('../models/userModel');
// Mock generateToken utility
jest.mock('../utils/tokenHelper');

// Mock express-async-handler to directly execute the async function
jest.mock('express-async-handler', () => (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
});

describe('authController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authUser', () => {
    it('should authenticate user and return token on success', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      const mockUser = {
        _id: 'someId',
        name: 'Test User',
        email: 'test@example.com',
        matchPassword: jest.fn().mockResolvedValue(true),
      };
      User.findOne.mockResolvedValue(mockUser);
      generateToken.mockReturnValue('mockToken');

      await authUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.matchPassword).toHaveBeenCalledWith('password123');
      expect(generateToken).toHaveBeenCalledWith('someId');
      expect(res.json).toHaveBeenCalledWith({
        _id: 'someId',
        name: 'Test User',
        email: 'test@example.com',
        token: 'mockToken',
      });
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 401 if user not found', async () => {
      req.body = { email: 'nonexistent@example.com', password: 'password123' };
      User.findOne.mockResolvedValue(null);

      await authUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).toHaveBeenCalledWith(new Error('Invalid email or password'));
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should return 401 if password does not match', async () => {
      req.body = { email: 'test@example.com', password: 'wrongpassword' };
      const mockUser = {
        _id: 'someId',
        name: 'Test User',
        email: 'test@example.com',
        matchPassword: jest.fn().mockResolvedValue(false),
      };
      User.findOne.mockResolvedValue(mockUser);

      await authUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.matchPassword).toHaveBeenCalledWith('wrongpassword');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).toHaveBeenCalledWith(new Error('Invalid email or password'));
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('registerUser', () => {
    it('should register a new user and return token on success', async () => {
      req.body = { name: 'New User', email: 'new@example.com', password: 'newpassword123' };
      User.findOne.mockResolvedValue(null); // User does not exist
      const createdUser = {
        _id: 'newId',
        name: 'New User',
        email: 'new@example.com',
      };
      User.create.mockResolvedValue(createdUser);
      generateToken.mockReturnValue('newMockToken');

      await registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'new@example.com' });
      expect(User.create).toHaveBeenCalledWith({
        name: 'New User',
        email: 'new@example.com',
        password: 'newpassword123',
      });
      expect(generateToken).toHaveBeenCalledWith('newId');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: 'newId',
        name: 'New User',
        email: 'new@example.com',
        token: 'newMockToken',
      });
    });

    it('should return 400 if user already exists', async () => {
      req.body = { name: 'Existing User', email: 'existing@example.com', password: 'password123' };
      User.findOne.mockResolvedValue(true); // User already exists

      await registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'existing@example.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).toHaveBeenCalledWith(new Error('User already exists'));
      expect(User.create).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should return 400 if invalid user data', async () => {
      req.body = { name: 'Invalid User', email: 'invalid@example.com', password: 'invalid' };
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(null); // Invalid user data

      await registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'invalid@example.com' });
      expect(User.create).toHaveBeenCalledWith({
        name: 'Invalid User',
        email: 'invalid@example.com',
        password: 'invalid',
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).toHaveBeenCalledWith(new Error('Invalid user data'));
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});