import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BenchmarkDeepDiveApp from './BenchmarkDeepDiveApp.jsx'

createRoot(document.getElementById('benchmark-inline-app')).render(
  <StrictMode>
    <BenchmarkDeepDiveApp />
  </StrictMode>,
)
