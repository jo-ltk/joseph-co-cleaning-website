import { createRoot } from 'react-dom/client'
import App from './App'

// No StrictMode — Framer animations break with double-rendering
createRoot(document.getElementById('root')!).render(<App />)
