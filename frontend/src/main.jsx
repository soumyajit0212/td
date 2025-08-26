import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Shell from './components/Shell.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Environments from './pages/Environments.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'

function App(){
  const [token, setToken] = React.useState(localStorage.getItem('token'))
  const onLogin = (t) => { localStorage.setItem('token',t); setToken(t) }
  const onLogout = () => { localStorage.removeItem('token'); setToken(null) }

  if(!token) return <Login onLogin={onLogin}/>

  return (
    <BrowserRouter>
      <Shell onLogout={onLogout}>
        <Routes>
          <Route path="/" element={<Dashboard token={token}/>} />
          <Route path="/projects" element={<Projects token={token}/>} />
          <Route path="/environments" element={<Environments token={token}/>} />
          <Route path="/admin" element={<Admin token={token}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
