import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LeagueProvider } from './context/Leaguecontext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeagueProvider>
      <App />
    </LeagueProvider>
  </StrictMode>,
)
