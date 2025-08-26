import React from 'react'
export default function Topbar({title, subtitle, children}){
  return (
    <div>
      <div className="topbar">
        <div className="crumb">{subtitle || 'Overview'}</div>
        <div style={{fontWeight:700}}>{title}</div>
        <div style={{flex:1}}></div>
        <div className="search" style={{maxWidth:360}}>
          <input className="input" placeholder="Search..." />
        </div>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  )
}
