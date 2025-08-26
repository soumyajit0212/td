import React from 'react'
import Topbar from '../components/Topbar.jsx'
import useAuthAxios from '../useAuthAxios'

function Drawer({open, onClose, children, title}){
  if(!open) return null
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={e=>e.stopPropagation()}>
        <header>{title||'New Project'}</header>
        <div className="body">{children}</div>
      </div>
    </div>
  )
}

export default function Projects({token}){
  const ax = useAuthAxios(token)
  const [projects,setProjects] = React.useState([])
  const [tasks,setTasks] = React.useState([])
  const [changes,setChanges] = React.useState([])

  // filters
  const [q,setQ] = React.useState('')
  const [status,setStatus] = React.useState('All')
  const [from,setFrom] = React.useState('')
  const [to,setTo] = React.useState('')

  // drawer state
  const [drawer,setDrawer] = React.useState(false)

  // new project form
  const [pName,setPName] = React.useState('')
  const [pStatus,setPStatus] = React.useState('Planning')
  const [pStart,setPStart] = React.useState('')
  const [pEnd,setPEnd] = React.useState('')
  const [pDesc,setPDesc] = React.useState('')
  const [rows,setRows] = React.useState([emptyRow()])
  function emptyRow(){ return { taskName:'', startDate:'', endDate:'', completionPercent:0, jiraRef:'', comments:'' } }
  const addRow = () => setRows(r => [...r, emptyRow()])
  const delRow = (i) => setRows(r => r.filter((_,idx)=> idx!==i))
  const changeRow = (i,k,v) => setRows(r => r.map((row,idx)=> idx===i ? {...row,[k]:v} : row))

  async function load(){
    const [pr, ta, ch] = await Promise.all([ax.get('/api/projects'), ax.get('/api/tasks'), ax.get('/api/changes')])
    setProjects(pr.data); setTasks(ta.data); setChanges(ch.data)
  }
  React.useEffect(()=>{ load() }, [])

  async function saveProject(){
    if(!pName.trim()) return
    const p = await ax.post('/api/projects', {
      projectName:pName, status:pStatus, description:pDesc, startDate:pStart||null, endDate:pEnd||null
    })
    const id = p.data.projectId
    for(const r of rows){ if(!r.taskName.trim()) continue; await ax.post('/api/tasks', { ...r, project:{projectId:id} }) }
    setPName(''); setPStatus('Planning'); setPStart(''); setPEnd(''); setPDesc(''); setRows([emptyRow()])
    setDrawer(false); await load()
  }

  // UPLOAD handlers
  const [uploadMsg,setUploadMsg] = React.useState(null)
  const projInput = React.useRef(null)
  const patchInput = React.useRef(null)
  const testInput = React.useRef(null)

  async function doUpload(ref, url){
    const file = ref.current?.files?.[0]
    if(!file) return
    const fd = new FormData()
    fd.append('file', file)
    const res = await ax.post(url, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    setUploadMsg(JSON.stringify(res.data))
    await load()
  }

  // derived
  const filtered = projects.filter(p => {
    const okQ = !q || (p.projectName||'').toLowerCase().includes(q.toLowerCase()) || (p.description||'').toLowerCase().includes(q.toLowerCase())
    const okS = status==='All' || (p.status||'').toLowerCase().includes(status.toLowerCase())
    const s = p.startDate || null; const e = p.endDate || null
    const okFrom = !from || (s && s >= from)
    const okTo = !to || (e && e <= to)
    return okQ && okS && okFrom && okTo
  })
  // pagination
  const [page,setPage] = React.useState(1); const pageSize=10
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageRows = filtered.slice((page-1)*pageSize, page*pageSize)

  function avgProgress(projectId){
    const rows = tasks.filter(t => t.project && t.project.projectId === projectId)
    if(rows.length===0) return 0
    const sum = rows.reduce((acc,t) => acc + (t.completionPercent||0), 0)
    return Math.round(sum / rows.length)
  }

  // TIMELINE helpers
  function toDate(s){ if(!s) return null; return new Date(s) }
  const projWithDates = projects.map(p => ({...p, s: toDate(p.startDate), e: toDate(p.endDate)})).filter(p=>p.s && p.e && !isNaN(p.s) && !isNaN(p.e))
  const minDate = projWithDates.length? new Date(Math.min(...projWithDates.map(p=>p.s))) : null
  const maxDate = projWithDates.length? new Date(Math.max(...projWithDates.map(p=>p.e))) : null
  function pct(date){ if(!minDate || !maxDate) return 0; const total=(maxDate-minDate)||1; return Math.max(0, Math.min(100, Math.round(((date-minDate)/total)*100))) }

  return (
    <Topbar title="Projects" subtitle="Data">
      <div className="card">
        <div className="toolbar">
          <div style={{flex:'1 1 260px'}}><input className="input" placeholder="Search projects..." value={q} onChange={e=>setQ(e.target.value)} /></div>
          <div style={{width:180}}>
            <select className="input" value={status} onChange={e=>{setStatus(e.target.value); setPage(1)}}>
              <option>All</option><option>Planning</option><option>In Progress</option><option>Completed</option><option>On Hold</option>
            </select>
          </div>
          <div style={{width:160}}><input type="date" className="input" value={from} onChange={e=>setFrom(e.target.value)} /></div>
          <div style={{width:160}}><input type="date" className="input" value={to} onChange={e=>setTo(e.target.value)} /></div>
          <div style={{flex:1}}></div>
          <button className="btn" onClick={()=>setDrawer(true)}>+ New Project</button>
        </div>
      </div>

      <div className="grid g-2">
        <div className="card">
          <div className="sectionTitle">Projects</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
                <th>Progress</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map(p => (
                <tr key={p.projectId}>
                  <td>{p.projectName}<div className="muted" style={{fontSize:12}}>{p.description||''}</div></td>
                  <td><span className="chip">{p.status || 'Planning'}</span></td>
                  <td>{p.startDate || '-'}</td>
                  <td>{p.endDate || '-'}</td>
                  <td>
                    <div className="muted" style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{background:'#ecfdf5', height:8, borderRadius:999, width:120, overflow:'hidden'}}>
                        <div style={{height:'100%', width: (avgProgress(p.projectId))+'%', background:'var(--brand)'}}></div>
                      </div>
                      <b>{avgProgress(p.projectId)}%</b>
                    </div>
                  </td>
                  <td>{tasks.filter(t => t.project && t.project.projectId === p.projectId).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="toolbar" style={{justifyContent:'flex-end'}}>
            <button className="btn ghost" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
            <div className="muted">Page {page} / {pageCount}</div>
            <button className="btn ghost" onClick={()=>setPage(p=>Math.min(pageCount,p+1))} disabled={page===pageCount}>Next</button>
          </div>
        </div>

        <div className="card">
          <div className="sectionTitle">Bulk Upload</div>
          <div className="grid g-3">
            <div className="card" style={{padding:12}}>
              <div style={{fontWeight:700}}>Upload Project Plan (.xlsx)</div>
              <div className="muted" style={{fontSize:12, margin:'6px 0'}}>Columns: PROJECT,TASK,ASSIGNED TO,COMPLETION %,START,END,DAYS,Comments</div>
              <input type="file" accept=".xlsx" ref={projInput} onChange={()=>doUpload(projInput,'/api/upload/projects-tasks')} />
            </div>
            <div className="card" style={{padding:12}}>
              <div style={{fontWeight:700}}>Upload Patches/CodeDrops (.xlsx)</div>
              <div className="muted" style={{fontSize:12, margin:'6px 0'}}>Columns: patch/code Version,Type(Patch/DM/CodeDrop),Jira ref,Environments,Deployed-date,manifest file name</div>
              <input type="file" accept=".xlsx" ref={patchInput} onChange={()=>doUpload(patchInput,'/api/upload/changes')} />
            </div>
            <div className="card" style={{padding:12}}>
              <div style={{fontWeight:700}}>Upload Test Tasks (.xlsx)</div>
              <div className="muted" style={{fontSize:12, margin:'6px 0'}}>Columns: Test case,Defect number,Completion status,target date,Comments</div>
              <input type="file" accept=".xlsx" ref={testInput} onChange={()=>doUpload(testInput,'/api/upload/tests')} />
            </div>
          </div>
          {uploadMsg && <div className="card" style={{marginTop:12}}><div className="muted">Upload result</div><pre style={{whiteSpace:'pre-wrap'}}>{uploadMsg}</pre></div>}
        </div>

        <div className="card" style={{gridColumn:'1 / -1'}}>
          <div className="sectionTitle">Timeline</div>
          {!minDate && <div className="muted">Add start/end dates to your projects to see the timeline.</div>}
          {minDate && (
            <div className="timeline">
              {projects.map(p => {
                const s = toDate(p.startDate); const e = toDate(p.endDate)
                if(!s || !e || isNaN(s) || isNaN(e)) return (
                  <div key={p.projectId} className="trow">
                    <div>{p.projectName}</div>
                    <div className="muted">No dates</div>
                  </div>
                )
                const left = pct(s); const right = pct(e)
                return (
                  <div key={p.projectId} className="trow">
                    <div>{p.projectName}</div>
                    <div className="tbar">
                      <div className="tseg" style={{left:left+'%', width: Math.max(2, right-left)+'%'}}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Drawer open={drawer} onClose={()=>setDrawer(false)} title="Create Project">
        <div className="row">
          <div>
            <div className="muted">Project Name</div>
            <input className="input" value={pName} onChange={e=>setPName(e.target.value)} />
          </div>
          <div>
            <div className="muted">Status</div>
            <select className="input" value={pStatus} onChange={e=>setPStatus(e.target.value)}>
              <option>Planning</option><option>In Progress</option><option>Completed</option><option>On Hold</option>
            </select>
          </div>
          <div>
            <div className="muted">Start</div>
            <input type="date" className="input" value={pStart} onChange={e=>setPStart(e.target.value)} />
          </div>
          <div>
            <div className="muted">End</div>
            <input type="date" className="input" value={pEnd} onChange={e=>setPEnd(e.target.value)} />
          </div>
        </div>
        <div style={{marginTop:12}}>
          <div className="muted">Description</div>
          <input className="input" value={pDesc} onChange={e=>setPDesc(e.target.value)} />
        </div>

        <div style={{height:12}}/>
        <div style={{fontWeight:700}}>Tasks</div>
        <table>
          <thead><tr><th>Task</th><th>Start</th><th>End</th><th>%</th><th>Jira</th><th>Comments</th><th></th></tr></thead>
          <tbody>
            {rows.map((r,idx)=>(
              <tr key={idx}>
                <td><input className="input" value={r.taskName} onChange={e=>changeRow(idx,'taskName',e.target.value)} /></td>
                <td><input type="date" className="input" value={r.startDate} onChange={e=>changeRow(idx,'startDate',e.target.value)} /></td>
                <td><input type="date" className="input" value={r.endDate} onChange={e=>changeRow(idx,'endDate',e.target.value)} /></td>
                <td><input type="number" className="input" value={r.completionPercent} onChange={e=>changeRow(idx,'completionPercent',parseInt(e.target.value||'0'))} /></td>
                <td><input className="input" value={r.jiraRef} onChange={e=>changeRow(idx,'jiraRef',e.target.value)} /></td>
                <td><input className="input" value={r.comments} onChange={e=>changeRow(idx,'comments',e.target.value)} /></td>
                <td><button className="btn ghost" onClick={()=>delRow(idx)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="toolbar" style={{marginTop:10}}>
          <button className="btn ghost" onClick={addRow}>+ Add Task</button>
          <div style={{flex:1}}></div>
          <button className="btn" onClick={saveProject}>Save Project</button>
        </div>
      </Drawer>
    </Topbar>
  )
}
