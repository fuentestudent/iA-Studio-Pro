import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, LineChart, PieChart, Moon, Sun } from 'lucide-react';
import CodeEditor from './CodeEditor';
import projectApi from '../api/projectApi';
import llmApi from '../api/llmApi';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Dashboard = () => {
  const { t, i18n } = useTranslation(); // Initialize useTranslation
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [optimizedPromptResult, setOptimizedPromptResult] = useState(null);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isOptimizingPrompt, setIsOptimizingPrompt] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const data = await projectApi.getProjects();
      setProjects(data);
    } catch (error) {
      console.error(t('dashboard.errorFetchingProjects'), error);
      alert(t('dashboard.errorFetchingProjects'));
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleOptimizePrompt = async (prompt) => {
    setIsOptimizingPrompt(true);
    console.log(t('dashboard.optimizingPrompt'), prompt);
    try {
      const result = await llmApi.optimizePrompt(prompt);
      setOptimizedPromptResult(result.data.finalOptimizedPrompt);
      alert(t('dashboard.promptOptimizedSuccessfully'));
    } catch (error) {
      console.error(t('dashboard.errorOptimizingPrompt'), error);
      alert(t('dashboard.errorOptimizingPrompt'));
    } finally {
      setIsOptimizingPrompt(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (newProjectName && newProjectDescription) {
      setIsCreatingProject(true);
      try {
        const newProject = await projectApi.createProject({
          name: newProjectName,
          description: newProjectDescription,
        });
        setProjects([...projects, newProject]);
        setNewProjectName('');
        setNewProjectDescription('');
        alert(t('dashboard.projectCreatedSuccessfully'));
      } catch (error) {
        console.error(t('dashboard.errorCreatingProject'), error);
        alert(t('dashboard.errorCreatingProject'));
      } finally {
        setIsCreatingProject(false);
      }
    } else {
      alert(t('dashboard.fillAllFields'));
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center">
          {/* INTEGRADA Logo Icon */}
          <div className="bg-[#4ecdc4] p-2 rounded-md mr-3">
            <div className="grid grid-cols-3 gap-1">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{t('common.platformName')}</h1>
        </div>
        <div className="flex flex-col items-end md:flex-row md:items-center">
          {/* Language Toggle */}
          <button
            onClick={() => changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
            className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300 mr-2 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4]"
          >
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4]"
            data-testid="theme-toggle-button"
          >
            {theme === 'light' ? (
              <Moon />
            ) : (
              <Sun />
            )}
          </button>
          <p className="text-right text-lg font-medium text-gray-600 mt-2 md:mt-0 md:ml-4">{t('common.platformSubtitle')}</p>
        </div>
      </header>
      <h1 className="text-2xl font-bold mb-4">{t('dashboard.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-700">{t('dashboard.activeProjects')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-700">{t('dashboard.availableAIModels')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-700">{t('dashboard.apiUsage')}</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="w-full h-24 text-[#4ecdc4]" />
          </CardContent>
        </Card>
      </div>

      {/* Code Editor Section */}
      <div className="mb-4">
        <CodeEditor onOptimize={handleOptimizePrompt} isOptimizing={isOptimizingPrompt} />
      </div>

      {/* Optimized Prompt Result Section */}
      {optimizedPromptResult && (
        <div className="mb-4">
          <Card className="bg-white rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-700">{t('dashboard.optimizationResult')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="bg-gray-50 p-3 rounded-md text-sm text-gray-800">{optimizedPromptResult}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Project Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-700">{t('dashboard.createNewProject')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                  {t('dashboard.projectName')}
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4ecdc4] focus:ring-2 focus:ring-offset-2 focus:ring-[#4ecdc4] sm:text-sm p-2 text-gray-900"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
                  {t('dashboard.description')}
                </label>
                <textarea
                  id="projectDescription"
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4ecdc4] focus:ring-2 focus:ring-offset-2 focus:ring-[#4ecdc4] sm:text-sm p-2 text-gray-900"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#4ecdc4] hover:bg-[#3aa79f] text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4] focus:ring-offset-2"
                disabled={isCreatingProject}
              >
                {isCreatingProject ? t('dashboard.creatingProject') : t('dashboard.createProject')}
              </button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-700">{t('dashboard.myProjects')}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingProjects ? (
              <p className="text-gray-600">{t('common.loadingProjects')}</p>
            ) : projects.length === 0 ? (
              <p className="text-gray-600">{t('dashboard.noProjectsYet')}</p>
            ) : (
              <ul className="space-y-3">
                {projects.map((project) => (
                  <Card key={project._id} className="bg-gray-50 shadow-sm border border-gray-200">
                    <CardContent className="p-3">
                      <h4 className="text-md font-semibold text-gray-800">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.description}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {project.status}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;