import React from 'react'
import axios from 'axios'
export default function useAuthAxios(token){
  return React.useMemo(()=>{
    const ax = axios.create()
    ax.interceptors.request.use(cfg => { cfg.headers = cfg.headers || {}; if(token) cfg.headers.Authorization = `Bearer ${token}`; return cfg })
    return ax
  }, [token])
}
