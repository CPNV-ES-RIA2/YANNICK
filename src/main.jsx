import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { LanguageProvider } from './providers/languages'
import ErrorProvider from './providers/errors.jsx'
import {ResultsProvider} from "./providers/results.jsx";


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./serviceWorker.js')
      .then(function (registration) {
        console.log('Service Worker registration successful with scope: ', registration.scope);
      }, function (err) {
        console.log('Service Worker registration failed: ', err);
      });
  });
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
        <ResultsProvider>
          <ErrorProvider>
            <App />
          </ErrorProvider>
        </ResultsProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
