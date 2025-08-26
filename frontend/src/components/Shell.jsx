import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Shell({children, onLogout}){
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logoRow">
          <div className="logoMark"></div>
          <div className="brand">ProjectHub</div>
        </div>
        <nav className="menu">
          <NavLink to="/" end className={({isActive})=> isActive? 'active': ''}>
            <span className="icon">📊</span> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/projects" className={({isActive})=> isActive? 'active': ''}>
            <span className="icon">📁</span> <span>Projects</span>
          </NavLink>
          <NavLink to="/environments" className={({isActive})=> isActive? 'active': ''}>
            <span className="icon">🌐</span> <span>Environments</span>
          </NavLink>
          <NavLink to="/admin" className={({isActive})=> isActive? 'active': ''}>
            <span className="icon">⚙️</span> <span>Admin</span>
          </NavLink>
        </nav>
        <div style={{flex:1}}></div>
        <button className="btn" onClick={onLogout}>Logout</button>
      </aside>
      <main>
        {children}
      </main>
    </div>
  )
}
