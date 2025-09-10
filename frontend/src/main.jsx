import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css';
import './index.css'
import App from './App.jsx'

// Google Fonts 
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
