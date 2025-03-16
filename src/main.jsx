import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/Navbar.css';
import './styles/Home.css';
import './styles/Auth.css'; // If created for login/signup
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
