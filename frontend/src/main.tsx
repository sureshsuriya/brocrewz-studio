import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.tsx'

const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://brocrewz-studio.onrender.com';
axios.defaults.baseURL = apiBase.replace(/\/+$/, '');

if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
  console.warn('[BroCrewz] VITE_API_BASE_URL not set — falling back to Render backend for dev. Set it in frontend/.env.local for local development.');
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
