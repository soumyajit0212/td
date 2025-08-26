import React from 'react'
import Topbar from '../components/Topbar.jsx'
import useAuthAxios from '../useAuthAxios'

function KPI({label, value}){
  return (
    <div className="card kpi">
      <div className="dot">•</div>
      <div>
        <div className="muted">{label}</div>
        <div style={{fontSize:22,fontWeight:700}}>{value}</div>
      </div>
    </div>
  )
}

export default function Dashboard({token}){
  const ax = useAuthAxios(token)
  const [summary,setSummary] = React.useState({})
  const [envs,setEnvs] = React.useState([])
  const [changes,setChanges] = React.useState([])
  const [projects,setProjects] = React.useState([])
  const [tasks,setTasks] = React.useState([])

  React.useEffect(()=>{
    (async()=>{
      const [sum,en,ch,pr,ta] = await Promise.all([
        ax.get('/api/dashboard/summary'),
        ax.get('/api/envs'),
        ax.get('/api/changes'),
        ax.get('/api/projects'),
        ax.get('/api/tasks')
      ])
      setSummary(sum.data); setEnvs(en.data); setChanges(ch.data); setProjects(pr.data); setTasks(ta.data);
    })()
  }, [])

  const changesByEnv = {}
  changes.forEach(c => {
    const name = c.environment ? c.environment.envName : 'unassigned'
    changesByEnv[name] = (changesByEnv[name] || 0) + 1
  })

  const tasksCompleted = tasks.filter(t => (t.completionPercent||0) >= 100).length
  const tasksInProgress = tasks.filter(t => (t.completionPercent||0) > 0 && (t.completionPercent||0) < 100).length
  const tasksNotStarted = tasks.length - tasksCompleted - tasksInProgress

  return (
    <Topbar title="Dashboard" subtitle="Dashboard">
      <div className="cards">
        <KPI label="Projects" value={summary.projects||0} />
        <KPI label="Tasks" value={summary.tasks||0} />
        <KPI label="Environments" value={summary.environments||0} />
        <KPI label="Changes" value={summary.changes||0} />
      </div>

      <div className="grid g-2">
        <div className="card">
          <div className="sectionTitle">Project Statistics</div>
          <table>
            <tbody>
              <tr><td className="muted">Planning</td><td>{projects.filter(p=>(p.status||'').toLowerCase().includes('plan') || !(p.status)).length}</td></tr>
              <tr><td className="muted">In Progress</td><td>{projects.filter(p=>(p.status||'').toLowerCase().includes('progress')).length}</td></tr>
              <tr><td className="muted">Completed</td><td>{projects.filter(p=>(p.status||'').toLowerCase().includes('complete')).length}</td></tr>
              <tr><td className="muted">On Hold</td><td>{projects.filter(p=>(p.status||'').toLowerCase().includes('hold')).length}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="sectionTitle">Task Statistics</div>
          <table>
            <tbody>
              <tr><td className="muted">Not Started</td><td>{tasksNotStarted}</td></tr>
              <tr><td className="muted">In Progress</td><td>{tasksInProgress}</td></tr>
              <tr><td className="muted">Completed</td><td>{tasksCompleted}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="sectionTitle">Environment Health</div>
          <table>
            <thead><tr><th>Environment</th><th>Deploys</th><th>Status</th></tr></thead>
            <tbody>
              {envs.map(e => (
                <tr key={e.envId}>
                  <td>{e.envName} <span className="muted">({e.envType})</span></td>
                  <td>{changesByEnv[e.envName]||0}</td>
                  <td><span className="chip">Healthy</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="sectionTitle">Change Progress by Environment</div>
          <table>
            <thead><tr><th>Environment</th><th>Total Changes</th></tr></thead>
            <tbody>
              {Object.entries(changesByEnv).map(([env,count]) => (
                <tr key={env}><td>{env}</td><td>{count}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Topbar>
  )
}
