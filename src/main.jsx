import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components//Navbar/Navbar.css';
import './pages/Home/Home.css';
import './pages/Auth/Login.css';
import './pages/Auth/Signup.css';
import './pages/Auth/Auth.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
