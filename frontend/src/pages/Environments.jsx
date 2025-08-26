import React from 'react'
import Topbar from '../components/Topbar.jsx'
import useAuthAxios from '../useAuthAxios'

export default function Environments({token}){
  const ax = useAuthAxios(token)
  const [envs,setEnvs] = React.useState([])
  const [envName,setEnvName] = React.useState('development')
  const [envType,setEnvType] = React.useState('Development')
  const [hostname,setHostname] = React.useState('localhost')

  async function load(){ const r = await ax.get('/api/envs'); setEnvs(r.data) }
  React.useEffect(()=>{ load() }, [])

  async function add(){ await ax.post('/api/envs',{envName, envType, hostname}); setEnvName(''); setEnvType(''); setHostname(''); await load() }

  return (
    <Topbar title="Environments" subtitle="Data">
      <div className="card">
        <div className="sectionTitle">Add Environment</div>
        <div className="grid g-2">
          <div><div className="muted">Name</div><input className="input" value={envName} onChange={e=>setEnvName(e.target.value)} /></div>
          <div><div className="muted">Type</div><input className="input" value={envType} onChange={e=>setEnvType(e.target.value)} /></div>
          <div style={{gridColumn:'1 / -1'}}><div className="muted">Hostname</div><input className="input" value={hostname} onChange={e=>setHostname(e.target.value)} /></div>
        </div>
        <div style={{marginTop:12}}><button className="btn" onClick={add}>Save</button></div>
      </div>

      <div className="card">
        <div className="sectionTitle">Environments</div>
        <table>
          <thead><tr><th>Name</th><th>Type</th><th>Hostname</th></tr></thead>
          <tbody>{envs.map(e => <tr key={e.envId}><td>{e.envName}</td><td>{e.envType}</td><td>{e.hostname || '-'}</td></tr>)}</tbody>
        </table>
      </div>
    </Topbar>
  )
}
