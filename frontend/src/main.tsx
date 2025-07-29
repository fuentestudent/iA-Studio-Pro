import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './i18n'; // Importar la configuración de i18n
import { I18nextProvider } from 'react-i18next'; // Importar I18nextProvider
import i18n from './i18n'; // Import i18n instance

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </ThemeProvider>
  </StrictMode>,
)
