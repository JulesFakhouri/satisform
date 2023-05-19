import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import Router from './Router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </HashRouter>
)
