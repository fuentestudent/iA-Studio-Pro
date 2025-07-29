import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../src/components/Dashboard';
import projectApi from '../src/api/projectApi';
import llmApi from '../src/api/llmApi';
import { useTheme } from '../src/context/ThemeContext';
import { useTranslation } from 'react-i18next';

// Mock external dependencies
jest.mock('../src/api/projectApi');
jest.mock('../src/api/llmApi');
jest.mock('../src/context/ThemeContext');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Mock translation function
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    projectApi.getProjects.mockClear();
    projectApi.createProject.mockClear();
    llmApi.optimizePrompt.mockClear();
    useTheme.mockClear();
    useTranslation().i18n.changeLanguage.mockClear();
    global.alert = jest.fn();

    // Default mock implementations
    projectApi.getProjects.mockResolvedValue([]);
    projectApi.createProject.mockResolvedValue({ _id: 'newProj1', name: 'My New Project', description: 'Description of new project', status: 'Active' });
    llmApi.optimizePrompt.mockResolvedValue({ data: { finalOptimizedPrompt: 'Optimized Prompt' } });
    useTheme.mockReturnValue({ theme: 'light', toggleTheme: jest.fn() });
  });

  it('renders dashboard title and initial project count', async () => {
    render(<Dashboard />);
    expect(screen.getByText('dashboard.title')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Initial project count
  });

  it('fetches and displays projects on load', async () => {
    const mockProjects = [{ _id: '1', name: 'Project A', description: 'Desc A', status: 'Active' }];
    projectApi.getProjects.mockResolvedValue(mockProjects);

    await act(async () => {
      render(<Dashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText('Project A')).toBeInTheDocument();
      expect(screen.getByText('Desc A')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Updated project count
    });
  });

  it('creates a new project', async () => {
    render(<Dashboard />);

    fireEvent.change(screen.getByLabelText('dashboard.projectName'), { target: { value: 'My New Project' } });
    fireEvent.change(screen.getByLabelText('dashboard.description'), { target: { value: 'Description of new project' } });
    fireEvent.click(screen.getByText('dashboard.createProject'));

    await waitFor(() => {
      expect(projectApi.createProject).toHaveBeenCalledWith({
        name: 'My New Project',
        description: 'Description of new project',
      });
      expect(screen.getByText('My New Project')).toBeInTheDocument();
      expect(screen.getByText('Description of new project')).toBeInTheDocument();
    });
  });

  it('optimizes a prompt', async () => {
    render(<Dashboard />);

    fireEvent.change(screen.getByPlaceholderText('Escribe tu prompt o código aquí...'), { target: { value: 'Test prompt' } });
    await act(async () => {
      fireEvent.click(screen.getByText('Optimizar Prompt'));
    });

    await waitFor(() => {
      expect(llmApi.optimizePrompt).toHaveBeenCalledWith('Test prompt');
      expect(screen.getByText('Optimized Prompt')).toBeInTheDocument();
    });
  });

  it('toggles theme', async () => {
    const toggleThemeMock = jest.fn();
    useTheme.mockReturnValue({ theme: 'light', toggleTheme: toggleThemeMock });
    render(<Dashboard />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('theme-toggle-button'));
    });
    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('changes language', async () => {
    const changeLanguageMock = jest.fn();
    jest.spyOn(require('react-i18next'), 'useTranslation').mockReturnValue({
      t: (key) => key,
      i18n: {
        changeLanguage: changeLanguageMock,
        language: 'en',
      },
    });
    render(<Dashboard />);

    await act(async () => {
      fireEvent.click(screen.getByText('ES')); // Click to change to Spanish
    });
    expect(changeLanguageMock).toHaveBeenCalledWith('es');
  });

  it('shows loading state when fetching projects', async () => {
    projectApi.getProjects.mockReturnValue(new Promise(() => {})); // Never resolve to keep loading
    render(<Dashboard />);
    await act(async () => {}); // Allow effects to run
    expect(screen.getByText('common.loadingProjects')).toBeInTheDocument();
  });

  it('shows loading state when creating project', async () => {
    projectApi.createProject.mockReturnValue(new Promise(() => {})); // Never resolve to keep loading
    render(<Dashboard />);
    fireEvent.change(screen.getByLabelText('dashboard.projectName'), { target: { value: 'Loading Project' } });
    fireEvent.change(screen.getByLabelText('dashboard.description'), { target: { value: 'Loading Desc' } });
    await act(async () => {
      fireEvent.click(screen.getByText('dashboard.createProject'));
    });
    expect(screen.getByText('dashboard.creatingProject')).toBeInTheDocument();
  });

  it('shows loading state when optimizing prompt', async () => {
    llmApi.optimizePrompt.mockReturnValue(new Promise(() => {})); // Never resolve to keep loading
    render(<Dashboard />);
    fireEvent.change(screen.getByPlaceholderText('Escribe tu prompt o código aquí...'), { target: { value: 'Loading prompt' } });
    await act(async () => {
      fireEvent.click(screen.getByText('Optimizar Prompt'));
    });
    expect(screen.getByText('Optimizando...')).toBeInTheDocument();
  });
});