import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { LanguageProvider } from './providers/languages'
import ErrorProvider from './providers/errors.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
