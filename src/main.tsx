import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { LenisProvider } from './lib/lenis.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <LenisProvider>
      <App />
    </LenisProvider>
  </ThemeProvider>
)
