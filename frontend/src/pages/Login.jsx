import React from 'react'
import axios from 'axios'

export default function Login({onLogin}){
  const [email,setEmail] = React.useState('admin@example.com')
  const [password,setPassword] = React.useState('admin123')
  const [error,setError] = React.useState(null)

  async function submit(e){
    e.preventDefault()
    setError(null)
    try{
      const res = await axios.post('/api/auth/login',{email,password})
      onLogin(res.data.token)
    }catch(err){
      setError(err?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',alignItems:'center',justifyContent:'center',background:'#f6f7fb'}}>
      <div className="card" style={{width:360,padding:20}}>
        <h2 style={{marginTop:0,color:'var(--brand)'}}>Sign in</h2>
        <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:12}}>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div style={{color:'crimson'}}>{error}</div>}
          <button className="btn">Login</button>
        </form>
        <p className="muted" style={{marginTop:10}}>Default: <code>admin@example.com / admin123</code></p>
      </div>
    </div>
  )
}
