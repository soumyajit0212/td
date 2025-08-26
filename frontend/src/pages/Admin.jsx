import React from 'react'
import Topbar from '../components/Topbar.jsx'
import useAuthAxios from '../useAuthAxios'

export default function Admin({token}){
  const ax = useAuthAxios(token)
  const [users,setUsers] = React.useState([])
  const [orgs,setOrgs] = React.useState([])

  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('admin123')
  const [name,setName] = React.useState('')
  const [role,setRole] = React.useState('USER')
  const [q,setQ] = React.useState('')

  React.useEffect(()=>{
    (async()=>{ const [u,o] = await Promise.all([ax.get('/api/users'), ax.get('/api/orgs')]); setUsers(u.data); setOrgs(o.data) })()
  }, [])

  async function createUser(){
    await ax.post('/api/auth/register', {email,password,name,role})
    const u = await ax.get('/api/users'); setUsers(u.data)
    setEmail(''); setName(''); setRole('USER')
  }

  return (
    <Topbar title="Admin" subtitle="Settings">
      <div className="grid g-2">
        <div className="card">
          <div className="sectionTitle">Create User</div>
          <div className="grid g-2">
            <div><div className="muted">Email</div><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
            <div><div className="muted">Name</div><input className="input" value={name} onChange={e=>setName(e.target.value)} /></div>
            <div><div className="muted">Role</div><select className="input" value={role} onChange={e=>setRole(e.target.value)}><option>USER</option><option>ADMIN</option></select></div>
            <div><div className="muted">Password</div><input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" /></div>
          </div>
          <div style={{marginTop:12}}><button className="btn" onClick={createUser}>Create</button></div>
        </div>

        <div className="card">
          <div className="sectionTitle">Users</div>
          <div style={{marginBottom:8}}><input className="input" placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} /></div>
          <table>
            <thead><tr><th>Email</th><th>Name</th><th>Role</th></tr></thead>
            <tbody>
              {users.filter(u => !q || u.email.includes(q) || (u.name||'').toLowerCase().includes(q.toLowerCase()))
                .map(u => <tr key={u.userId}><td>{u.email}</td><td>{u.name}</td><td>{u.role}</td></tr>)}
            </tbody>
          </table>
        </div>

        <div className="card" style={{gridColumn:'1 / -1'}}>
          <div className="sectionTitle">Organizations</div>
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              {orgs.map(o => <tr key={o.orgId}><td>{o.orgId}</td><td>{o.orgName}</td><td>{o.description}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </Topbar>
  )
}
