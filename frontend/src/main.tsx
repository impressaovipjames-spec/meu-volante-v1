import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// Monitoramento de Erros Frontend
window.addEventListener('error', (event) => {
  console.error("Orion Error Monitor Caught:", event.error);
  if ((window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: event.message,
      fatal: true
    });
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
